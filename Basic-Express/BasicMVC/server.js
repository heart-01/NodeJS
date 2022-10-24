import express from "./config/express.js";
import "./config/mongoose.db.js";

const app = express();
app.listen(3000);

console.log('Server running on port http://localhost:3000');

export default app;
