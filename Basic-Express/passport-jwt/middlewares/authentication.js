import passport from "passport";

export const passportVerifyToken = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, options) => {
    if (err) return next(err);

    if (user) {
      req["profile"] = user; // รับข้อมูล user ที่ได้จากการ decode jwt token มาใส่ใน req.profile
      next();
    } else {
      return res.status(422).json(options);
    }
  })(req, res, next);
};
