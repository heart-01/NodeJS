// Import Express
import express from "express";

// Create Router
const router = express.Router();

// Create Routing Method
router.get("/", (req, res) => {
  // res.send('<h1>Hello Express</h1>')
  res.render("pages/index.ejs");
});

router.get("/about", (req, res) => {
  // res.send('<h1>Hello Express</h1>')
  res.render("pages/about.ejs");
});

router.get("/api/user/:id", (req, res) => {
  res.send(`Hello User ID: ${req.params.id}`);
});

router.post("/api", (req, res) => {
  // res.send('POST API')
  res.json({ name: "Samit", email: "samit@email.com" });
});

export default router;
