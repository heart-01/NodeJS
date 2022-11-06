import { Router } from 'express';
import { passportVerifyToken } from '../middlewares/authentication.js';


import auth from "./auth.js";
import user from "./user.js";

const router = Router();

router.use("/auth", auth);
router.use("/user", passportVerifyToken, user);

export default router;
