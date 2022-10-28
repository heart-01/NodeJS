import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { model } from "mongoose";

const User = model("User"); // เรียกใช้ model user

// config instance login local strategy เพื่อให้ passport เอาไปใช้งานแล้วก็บอกวิธีว่าเราจะทำการตรวจสอบ username หรือ password ยังไงจากด้านล่างจะใช้ mongoose เช็ค username ว่ามีไหมถ้าไม่มีก็จะ return error
passport.use(
  new LocalStrategy((username, password, done) => { // (username, password, done) เป็น parameter ที่เช็ค verify user ที่รับเข้ามา
    User.findOne({ username }, (err, user) => {     // เช็ค username ว่ามีใน database ไหม
      if (err) {
        return done(err);
      }

      if (!user || !user.authenticate(password)) {   // เรียกใช้ method authenticate จาก userSchema เช็ค password
        // ถ้าเช็คแล้วไม่มี username หรือ password ไม่ถูกต้อง return error
        return done(null, false, {
          message: "Invalid username or password",
        });
      }

      // ถ้าสำเร็จ
      return done(null, user);
    });
  })
);

export default passport;
