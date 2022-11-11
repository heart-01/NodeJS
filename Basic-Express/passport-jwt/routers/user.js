import { Router } from "express";

const router = Router();

// GET /user หากเข้า url นี้จะตอบกลับด้วยข้อความ “respond with a resource”
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

// GET /user/profile หากเข้า url นี้จะตอบกลับด้วย user object
router.get("/profile", async (req, res, next) => {
  const { data } = await req.services.get("/user");

  const { response } = await req.services.post("/auth/login", {
    email: "admin@email.com",
    password: "password",
  });

  res.send({
    profile: req.profile,
    testGET: data,
    testPOST: response.data,
  });
});

export default router;
