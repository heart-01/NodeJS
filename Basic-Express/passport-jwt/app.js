import express from "express";
import routes from "./routers/index.js";
import "./configs/passport.js";

const app = express();
const port = process.env.PORT || 3000;

// Set Parses JSON
app.use(express.json());

// Error Handler
app.use((err, req, res, next) => {
  let statusCode = err.status || 500;
  res.status(statusCode);
  res.json({
    error: {
      status: statusCode,
      message: err.message,
    },
  });
});

// Pass token to request
app.use((req, res, next) => {
  const token = req.headers.authorization;
  req.token = token;
  next();
});

app.use(routes);

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`));

export default app;
