import user from "../controllers/user.controller.js";
import passport from "passport";

export const routers = (app) => {
  app.route('/signup')
    .get(user.renderSingup)
    .post(user.signup);

  // Login local
  app.route('/login')
    .get(user.renderLogin)
    // .post(user.login); // ใช้จากที่เขียนเอง
    .post(user.signIn);

  // Login Facebook
  app.get('/oauth/facebook', passport.authenticate('facebook', {
    failureRedirect: '/login',
  }));
  app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login',
    successRedirect: '/',
  }));

  // Login Google
  app.get('/oauth/google', passport.authenticate('google', {
    // scope จะบอกว่าเราไปขอ api จาก google+ api ไปขออะไรบ้าง
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    failureRedirect: '/login',
  }));
  app.get('/oauth/google/callback', passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/',
  }));

  // app.post("/logout", user.logout);
  app.post("/logout", user.logoutPassport);

  app.get("/users/:page?", user.getUserAll); // http://localhost:3000/users/30
  app.post("/user", user.createUser);

  app.param("username", user.userByUsername); // เช็คว่ามี param username ส่งเข้ามาทั้ง get และ post ไหมเพื่อที่จะดึงข้อมูลจาก username
  app.route("/user/:username")
    .get(user.readUsername)
    .patch(user.updateUser) // http://localhost:3000/users/admin
    .delete(user.deleteUser);
};

export default routers;
