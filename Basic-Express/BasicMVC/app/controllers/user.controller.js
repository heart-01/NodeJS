import UserModel from "../models/user.model.js";

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
  login,
  logout,
  getUserAll,
  createUser,
  userByUsername,
  readUsername,
  updateUser,
  deleteUser,
};

export default user;
