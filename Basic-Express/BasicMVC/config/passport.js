import passport from "passport";
import UserModel from "../app/models/user.model.js";

import "./strategies/local.js";
import "./strategies/facebook.js";
import "./strategies/google.js";

// เป็นการกำหนดว่าจะนำข้อมูลอะไรไปเก็บไว้ใน Session หลังจากผ่าน Login มาเรียบร้อบแล้ว
// authen เสร็จ ใช้ user.id เข้ารหัสแล้วเก็บเป็น session โดยเก็บเข้า cookie ที่ฝั่ง browser
passport.serializeUser((user, done) => { // parameter user คือ user ที่ผ่านการ login แล้ว
  done(null, user.id); // done คือ สั่งให้ทำงานเมื่อทำงานแล้วจะ error หรือ ไม่ error ส่วน null คือ การกำหนดว่าไม่ให้ error และ user.id จะเก็บไว้ในฝั่ง browser
});

// เป็นการกำหนดว่าจะนำข้อมูลออะไรใน Session ออกมาใช้งาน ซึ่งจะใช้ในหน้าเว็บเพจต่างๆ ที่สมาชิกเข้าถึงได้
// deserializeUser เป็นการถอดรหัสที่ได้จาก cookie แล้วดึงข้อมูล user.id จาก database
passport.deserializeUser((id, done) => {
  // Query findById โดยที่ไม่เอา password และ salt ติดออกมาแสดงด้วย
  UserModel.findById({ _id: id }, "-password -salt", (err, user) => {
    done(err, user); // ถ้าค้นหาเจอก็จะส่ง user ออกไป ถ้ามี error ก็ส่ง error ออกไปด้วย
  });
});

export default passport;
