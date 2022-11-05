// middleware สำหรับตรวจสอบ Token สำหรับ request ที่ต้องการเข้าถึง path url ที่ต้องมีการยืนยันตัวตนก่อน

import passport from "passport";
import passportJWT from "passport-jwt";
import UserModel from "../../mocks/UserModel.js";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // ExtractJWT.fromAuthHeaderAsBearerToken คือ การกำหนดให้ client จะต้องส่ง JWT Token โดยตั้งค่า Header ให้มี Key เป็น Authorization และ Value เป็น Bearer <token>
  secretOrKey: "your_jwt_secret", //SECRET เดียวกับตอน encode
};

// decode jwt token
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
          email: UserModel.email,
        };
        // return done(null, UserModel);
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
