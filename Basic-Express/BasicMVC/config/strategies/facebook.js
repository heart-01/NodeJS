import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import user from "../../app/controllers/user.controller.js";
import dotenv from "dotenv";

dotenv.config();

// config instance login facebook strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "displayName", "photos", "emails", "name"], // field ที่ต้องการจะขอจากการ login facebook
      passReqToCallback: true, // จะส่ง req เข้าไปใน callback ด้วย
    },
    (req, accessToken, refreshToken, profile, done) => {
      const providerData = profile._json;
      providerData.accessToken = accessToken;
      providerData.refreshToken = refreshToken;

      // map data ที่ได้จาก login facebook ไปเก็บไว้ที่ local database
      const providerUserProfile = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        // email: profile.emails[0].value,
        email: "facebook@email.com",
        provider: "facebook",
        providerId: profile.id,
        providerData: providerData,
      };

      // เรียกใช้ function saveOAuthUserProfile เพื่อเก็บ data หลังจาก login facebook ลง database
      user.saveOAuthUserProfile(req, providerUserProfile, done);
    }
  )
);

export default passport;
