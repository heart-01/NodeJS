import user from "../controllers/user.controller.js";

export const routers = (app) => {
  app.post("/login", user.login);
  app.post("/logout", user.logout);

  app.get("/users/:page?", user.getUserAll); // http://localhost:3000/users/30
  app.post("/user", user.createUser);

  app.param("username", user.userByUsername); // เช็คว่ามี param username ส่งเข้ามาทั้ง get และ post ไหมเพื่อที่จะดึงข้อมูลจาก username
  app.route("/user/:username")
    .get(user.readUsername)
    .patch(user.updateUser) // http://localhost:3000/users/admin
    .delete(user.deleteUser);
};

export default routers;
