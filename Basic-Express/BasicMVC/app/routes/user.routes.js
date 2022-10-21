import user from "../controllers/user.controller.js";

export const routers = (app) => {
  app.post("/login", user.login);
  app.post("/logout", user.logout);
};

export default routers;
