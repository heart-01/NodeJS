import passport from "passport";
import { model } from "mongoose";

const User = model("User"); // เรียกใช้ model user

// authen เสร็จ ใช้ user.id เข้ารหัสแล้วเก็บเป็น session โดยเก็บเข้า cookie ที่ฝั่ง browser
passport.serializeUser((user, done) => { // parameter user คือ user ที่ผ่านการ login แล้ว
  done(null, user.id); // done คือ สั่งให้ทำงานเมื่อทำงานแล้วจะ error หรือ ไม่ error ส่วน null คือ การกำหนดว่าไม่ให้ error และ user.id จะเก็บไว้ในฝั่ง browser
});

// deserializeUser เป็นการถอดรหัสที่ได้จาก cookie แล้วดึงข้อมูล user.id จาก database
passport.deserializeUser((id, done) => {
  // Query findById โดยที่ไม่เอา password และ salt ติดออกมาแสดงด้วย
  User.findById({ _id: id }, "-password -salt", (err, user) => {
    done(err, user); // ถ้าค้นหาเจอก็จะส่ง user ออกไป ถ้ามี error ก็ส่ง error ออกไปด้วย
  });
});

export default passport;
