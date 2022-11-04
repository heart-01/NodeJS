import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import user from "../../app/controllers/user.controller.js";
import dotenv from "dotenv";

dotenv.config();

// config instance login google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_APP_ID,
      clientSecret: process.env.GOOGLE_APP_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true, // จะส่ง req เข้าไปใน callback ด้วย
    },
    (req, accessToken, refreshToken, profile, done) => {
      const providerData = profile._json;
      providerData.accessToken = accessToken;
      providerData.refreshToken = refreshToken;

      // map data ที่ได้จาก login google ไปเก็บไว้ที่ local database
      const providerUserProfile = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        provider: "google",
        providerId: profile.id,
        providerData: providerData,
      };

      // เรียกใช้ function saveOAuthUserProfile เพื่อเก็บ data หลังจาก login google ลง database
      user.saveOAuthUserProfile(req, providerUserProfile, done);
    }
  )
);

export default passport;
