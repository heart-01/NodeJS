// Import Express
const express = require("express");

// Import Express Flash
const flash = require("express-flash");

// Import Express Session
const session = require("express-session");

// Import EJS Layout
const expressLayouts = require("express-ejs-layouts");

// Import Method Override
const methodOverride = require("method-override");

// Import Router frontend.js
const frontendRouter = require("./routes/frontend");
// Import Router backend.js
const backendRouter = require("./routes/backend");

// Create express object
const app = express();

// กำหนด Folder สำหรับบอกตัว express ว่าไฟล์ css , images อยู่ path ไหน
app.use(express.static("assets"));

// เรียกใช้ Method Override
app.use(methodOverride("_method")); // _method ต้องตรงกับ parameter ที่ต้องการเปลี่ยนจาก post เป็น put

// กำหนด Template Engine
app.use(expressLayouts);
app.set("layout", "./layouts/frontend"); // layouts ของ frontend
app.set("view engine", "ejs"); // view engine ของเราจะใช้เป็นไฟล์นามสกุล ejs

// กำหนดให้สามารถรับค่าจาก form ได้
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// เรียกใช้งาน Express Session
app.use(
  session({
    cookies: { maxAge: 60000 }, // เก็บค่า session เมื่อไม่มีการ refresh หน้าจอไว้ 60 นาที
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: "true",
    secret: "secret",
  })
);

// เรียกใช้ Express Flash
app.use(flash());

// เรียกใช้งาน Routes
app.use("/", frontendRouter);
app.use("/backend/", backendRouter);

// Run Express Server ที่ Port 3000
app.listen(3000, () => {
  console.log("Server run at port 3000");
});
