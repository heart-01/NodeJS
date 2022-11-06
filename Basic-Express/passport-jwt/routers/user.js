import { Router } from "express";
import callInternalAPI from "../shared/callInternalAPI.js";

const router = Router();

// GET /user/ หากเข้า url นี้จะตอบกลับด้วยข้อความ “respond with a resource”
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

// GET /user/profile หากเข้า url นี้จะตอบกลับด้วย user object
router.get("/profile", async (req, res, next) => {
  const { data } = await callInternalAPI(req, "user", "GET");
  res.send({
    profile: req.profile,
    data,
  });
});

export default router;
