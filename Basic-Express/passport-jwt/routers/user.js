import { Router } from "express";
import services from "../shared/services.js";

const router = Router();

// GET /user หากเข้า url นี้จะตอบกลับด้วยข้อความ “respond with a resource”
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

// GET /user/profile หากเข้า url นี้จะตอบกลับด้วย user object
router.get("/profile", async (req, res, next) => {
  const { data } = await services.get(req, "/user");
  res.send({
    profile: req.profile,
    data,
  });
});

export default router;
