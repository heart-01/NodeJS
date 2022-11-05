import { Router } from 'express';
import passport from "passport";

import auth from "./auth.js";
import user from "./user.js";

const router = Router();

router.use("/auth", auth);
router.use("/user", passport.authenticate("jwt", { session: false }), user);

export default router;
