import index from "../controllers/index.controller.js";

const routers = (app) => {
  app.get("/", index.render);
  app.get("/events", index.pingServer);
  // app.post("/", index.render);
  // app.put("/", index.render);
  // app.delete("/", index.render);
  // app.all("/", index.render);
  // app.route("/").get(index.render).post(index.other);
};

export default routers;