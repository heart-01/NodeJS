// middleware สำหรับตรวจสอบ Token สำหรับ request ที่ต้องการเข้าถึง path url ที่ต้องมีการยืนยันตัวตนก่อน

import passport from "passport";
import passportJWT from "passport-jwt";
import UserModel from "../../mocks/UserModel.js";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const publicKey = "your_jwt_secret";

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // ExtractJWT.fromAuthHeaderAsBearerToken คือ การกำหนดให้ client จะต้องส่ง JWT Token โดยตั้งค่า Header ให้มี Key เป็น Authorization และ Value เป็น Bearer <token>
  secretOrKey: publicKey, //SECRET เดียวกับตอน encode
};

// decode jwt token จะถูกเรียกใช้งานตอนที่ user ส่ง Bearer token เข้ามาแล้วไปค้นหาข้อมูลใน db เพื่อส่งไปยัง route ถัดไปที่มี middleware authentication กั้นอยู่
passport.use(
  new JWTStrategy(jwtOptions, (jwtPayload, done) => {
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    // return UserModel.findOneById(jwtPayload.id)
    //   .then((user) => {
    //     return done(null, user);
    //   })
    //   .catch((err) => {
    //     return done(err);
    //   });

    try {
      // find the user in db if needed
      if (jwtPayload.id === UserModel.id) {
        const user = {
          id: UserModel.id,
          sub: UserModel.sub,
          message: "send from JWTStrategy",
        };
        return done(null, user);
      } else {
        return done(null, false); //ส่วน function callback “done” parameters ตัวแรกจะหมายถึง error ส่วนตัวที่สองคือ ผ่าน หรือไม่ผ่าน done(errorOrNot, passOrNot);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
