import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import UserModel from "../mocks/UserModel.js";

const router = Router();

// passport.authentication('local') ซึ่งฟังก์ชันนี้ใช้สำหรับการตรวจสอบการยืนยันตัวตนของ user ด้วยวิธีการแบบ local strategy นั้นคือใช้ email/password และมีการ handle error หากข้อมูลไม่ถูกต้อง

// settings token jwt
const privateKey = "your_jwt_secret"; // encode key jwt token
const signOptions = {
  issuer: "passport-jwt",
  audience: "http://localhost:3000",
};

const generateToken = (payload) =>
  jwt.sign(payload, privateKey, {
    ...signOptions,
    expiresIn: 60, // 60 sec
  });

/* POST login. */
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, options) => {
    //  {session: false} ในฟังก์ชัน passport.authenticate() หมายถึงเราไม่ต้องการเก็บ user ไว้ใน session โดยเราสร้างและส่งค่าเป็น JSON web token ที่มีการ sign กับ user object ให้กับ client เท่านั้น ซึ่งใน user object นั้นไม่ควรเป็นข้อมูลสำคัญ เช่น password ควรเป็นข้อมูลที่สามารถช่วยในการยืนยันตัวตนได้ เช่น id, username หรือ email
    if (err) return next(err);
    if (user) {
      const mockUser = {
        id: UserModel.id,
        sub: UserModel.sub,
        email: UserModel.email,
      };
      const token = generateToken(mockUser);
      return res.json({ user, token });
    } else {
      return res.status(422).json(options);
    }
  })(req, res, next);
});

export default router;
