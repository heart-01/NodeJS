import UserModel from "../models/user.model.js";
import passport from "passport";

const getErrorMessage = (err) => {
  let message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = "Username already exists";
        break;

      default:
        message = "Something went wrong";
    }
  } else {
    // เคส Validation error จาก requried ของ userSchema
    for (let errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      }
    }
  }

  return message;
}

const renderSingup = (req, res) => {
  if (!req.user) { // ถ้าไม่มี user แนบมากับ req แสดงว่ายังไม่ได้ login
    res.render('signup', {
      title: 'Sign up',
      message: req.flash('error') // เรียกใช้ message จาก flash ที่เขียนไว้ด้วย key 'error' เมื่อมีการ redirect มา
    });
  } else {
    return res.redirect('/');
  }
};

const signup = (req, res, next) => {
  if (!req.user) { // ถ้าไม่มี user แนบมากับ req แสดงว่ายังไม่ได้ login
    const user = new UserModel(req.body);
    user.provider = 'local';
    
    user.save((err) => {
      if (err) {
        const message = getErrorMessage(err); // err จาก mongoose
        req.flash('error', message); // เรียกใช้ flash message

        return res.redirect('/signup');
      }
      
      // ถ้าสมัครผ่าน passport จะมี method login ให้ใช้งานเพื่อเข้าระบบ
      req.login(user, (err) => {
        if (err) return next(err); // debug throw error

        return res.redirect('/');
      });
    });
  } else {
    return res.redirect('/');
  }
};

const renderLogin = (req, res) => {
  if (!req.user) { // ถ้าไม่มี user แนบมากับ req แสดงว่ายังไม่ได้ login
    res.render('login', {
      title: 'Log in',
      message: req.flash('error') // เรียกใช้ message จาก flash ที่เขียนไว้ด้วย key 'error' เมื่อมีการ redirect มา
    });
  } else {
    return res.redirect('/');
  }
};

const signIn = (req, res) => {
   // passport.authenticate เป็น function เข้าสู่ระบบของ passport บอกให้ใช้ของ local ที่เราได้เขียนไว้ใน strategies local
  passport.authenticate(
    "local",
    (err, user, options) => {
      if (user) {
        // If the user exists log him in:
        req.login(user, (error) => {
          if (error) {
            res.json(error);
          } else {
            // HANDLE SUCCESSFUL LOGIN
            console.log("Successfully authenticated");
            res.redirect("/");
          }
        });
      } else {
        // HANDLE FAILURE LOGGING IN
        res.json(options.message); // Prints the reason of the failure
        // e.g. res.redirect("/login"))
        // or
        // res.render("/login", { message: options.message || "custom message" })
      }
    }
  )(req, res);
};

const logoutPassport = (req, res) => {
  // req.logout; 
  // res.redirect('/');
  req.session.destroy((err) => { // passport ทำ method logout ให้กับ req
    res.redirect('/');
  });
}

const saveOAuthUserProfile = (req, profile, done) => { // req, profile, done เดี๋ยว passport จะส่งต่าเข้ามาหลัง login แล้ว ส่วน profile จะเป็นข้อมูลของ user ที่แต่ละ provider ส่งมาเมื่อผ่านการ login
  // หาใน database ว่ามีการเก็บข้อมูลของ user ที่ login เข้ามาไหม
  UserModel.findOne({
    provider: profile.provider,     // strategy ที่ user login เข้ามา
    providerId: profile.providerId  // user id ที่ได้จาก provider หลังจาก login สำเร็จ
  }, (err, user) => {
    if (err) {  // ถ้าค้นหาแล้วมี error
      return done(err); 
    } else {
      if (!user) {  // ถ้าค้นหาแล้วไม่มีข้อมูลของ user
        const possibleUsername = profile.username || (profile.email ? profile.email.split('@')[0] : ''); // บาง provider อาจไม่มี username มาให้เราจะตัดจาก email มาทำเป็น username แทน

        // เช็คว่า username ซ้ำกันไหม
        UserModel.findUniqueUsername(
          possibleUsername,   // ชื่อ username ที่จะนำไปค้นหา
          null,               // เป็น suffix ที่จะให้เติมให้กับ username
          function (availableUsername) {  // ส่ง callback function เข้าไปเป็น parameter เพื่อเอาไว้ให้ findUniqueUsername เรียกใช้งาน
            profile.username = availableUsername; // กำหนดให้ username ของ profile ที่ login มีค่าเป็น parameter ที่ส่งเข้ามา
            user = new UserModel(profile); // save data user
            user.save((err) => {
              if (err) {
                const message = getErrorMessage(err);
                req.flash('error', message);
                return done(err); 
              }

              return done(null, user); // ถ้า save สำเร็จ
            });
          }
        );
      } else {      // ถ้ามีข้อมูลของ user อยู่แล้ว
        return done(err, user);
      }
    }
  });
}

// --------------------------------------------------------------------------------------------------------------------------------

const login = (req, res) => {
  if (req.body.remember === "remember") {
    // บันทึกลง cookie เก็บเอาไว้ใช้งาน
    req.session.remember = true;
    req.session.email = req.body.email;
    // req.sessionOptions.maxAge = 60000; // วันหมดอายุของ cookieSesseion
  }

  res.render("index", {
    title: `Logged in as ${req.body.email}`,
    isLoggedIn: true,
  });
};

const logout = (req, res) => {
  req.session = null;

  res.render("index", {
    title: "See you again later",
    isLoggedIn: false,
  });
};

// curl -X POST -H "Content-Type: application/json" -d '{"firstName": "Siwat", "lastName": "Jermwatthana", "email": "admin@email.com", "username": "admins", "password": "password"}' localhost:3000/user
const createUser = (req, res, next) => {
  const user = new UserModel(req.body);
  user.provider = 'local';

  user.save((err) => {
    if (err) {
      return next(err); // debug throw error
    } else {
      res.json(user);
    }
  });
};

const getUserAll = (req, res, next) => {
  // Mongoose javascript objects
  UserModel.find({}, "firstName lastName username", { skip: req.params.page ?? 0, limit: 10 }, (err, users) => {
    if (err) {
      return next(err);
    } else {
      res.json(users);
    }
  });

  // Mongoose Query builder
  /*
  UserModel.find({ firstName: "Siwat" })
    .where("age")
    .gt(18)
    .lt(60)
    .where("interests")
    .in(["reading", "movies"])
    .skip(0)
    .limit(10)
    .select("firstName lastName")
    .exec((err, users) => {
      if (err) {
        return next(err);
      } else {
        res.json(users);
      }
    });
  */
};

const readUsername = (req, res) => {
  res.json(req.user);
};

// curl -X PATCH -H "Content-Type: application/json" -d '{"email": "newmail@email.com"}' localhost:3000/user/admin
const updateUser = (req, res, next) => {
  UserModel.findOneAndUpdate(
    {
      username: req.user.username,
    },
    req.body,
    (err, user) => {
      if (err) {
        return next(err);
      } else {
        res.json(user);
      }
    }
  );
};

// curl -X DELETE localhost:3000/user/user
const deleteUser = (req, res, next) => {
  // req.user จะ provide method delete มาให้แล้วเราสามารถเรียกใช้งานได้เลย
  req.user.remove((err) => {
    if (err) {
      return next(err);
    } else {
      res.json(req.user);
    }
  });
};

const userByUsername = (req, res, next, username) => {
  UserModel.findOne(
    {
      username: username,
    },
    (err, user) => {
      if (err) {
        return next(err);
      } else {
        req.user = user; // ยัด data user ลงใน req.user แล้วส่งออกไป
        next(); // ส่งให้ middleware ตัวถัดไปทำงาน
      }
    }
  );
};

const user = {
  renderSingup,
  signup,
  renderLogin,
  signIn,
  login,
  logout,
  logoutPassport,
  getUserAll,
  createUser,
  userByUsername,
  readUsername,
  updateUser,
  deleteUser,
  saveOAuthUserProfile,
};

export default user;
