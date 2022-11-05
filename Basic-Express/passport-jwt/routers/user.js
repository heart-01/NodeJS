import { Router } from "express";

const router = Router();

// GET /user/ หากเข้า url นี้จะตอบกลับด้วยข้อความ “respond with a resource”
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

// GET /user/profile หากเข้า url นี้จะตอบกลับด้วย user object
router.get("/profile", (req, res, next) => {
  res.send(req.user);
});

export default router;
