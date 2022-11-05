import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserModel from "../../mocks/UserModel.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      // return UserModel.findOne({ email, password })
      //   .then((user) => {
      //     if (!user) {
      //       return done(null, false, { message: "Incorrect email or password." });
      //     }
      //     return done(null, user, { message: "Logged In Successfully" });
      //   })
      //   .catch((err) => done(err));

      //this one is typically a DB call.
      if (email !== UserModel.email || password !== UserModel.password) return done(null, false, { message: "Incorrect email or password." });

      return done(null, UserModel, { message: "Logged In Successfully" });
    }
  )
);

export default passport;
