import express from "express";
import morgan from "morgan";
import compression from "compression";
import sass from "node-sass-middleware";
import cookieSession from "cookie-session";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";

import dotenv from "dotenv";
import indexRoutes from "../app/routes/index.routes.js";
import userRoutes from "../app/routes/user.routes.js";

dotenv.config();

const redisClient = new Redis(6379, "127.0.0.1"); // connect redis server

export default () => {
  const app = express();

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev")); // morgan จะแสดง log debug ได้ง่าย
  } else if (process.env.NODE_ENV === "production") {
    app.use(compression()); // compression จะบีบอัด response ส่งออกไป
  }

  // express-session จะเก็บ id ฝั่งไว้ที่ browsers อย่างเดียวแล้ว server จะเก็บ data ไว้แล้วค่อยมา map กันที่หลังบ้านว่าตรงกับ id ไหนก็จะดึงตาม id นั้น แต่จะเก็บไว้ใน ram เมื่อมีการ restart server จะทำให้ข้อมูลทั้งหมดที่อยู่ใน session หาย เราจะใช้ redis มาจำค่าแทน
  const RedisStore = connectRedis(session);
  app.set("trust proxy", 1); // ไว้วางใจพร็อกซี่แรก
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      credentials: true,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: process.env.NODE_ENV === "production" ? "true" : "auto",
        httpOnly: true,
        expires: 60000,
      },
      store: new RedisStore({
        client: redisClient,
      }),
    })
  );

  /* cookieSession จะเก็บ token ฝั่งไว้ที่ browsers อย่างเดียวแล้ว server จะอ่านค่าตาม session ที่ส่งเข้ามา
  app.use(
    cookieSession({
      name: "session",
      keys: ["secret_key1", "secret_key2"],
    })
  );
  */

  app.use(express.urlencoded({ extended: true })); // จะทำให้เรา parse application/x-www-form-urlencoded ได้ extended: true คือ ให้ server สามารถรองรับ ประเภท request แบบ nested array ถ้าไม่ใส่จะรองรับได้แค่ string กับ array
  app.use(express.json()); // ดูคำขอที่มี Content-Type: application/json ส่วนหัวและแปลงอินพุต JSON แบบ String ให้เป็นตัวแปรที่เข้าถึงได้แบบ json

  app.set("views", "app/views"); // ประกาศให้ Express ใช้งาน View โดยให้ใช้โฟลเดอร์ views เป็นตัวเก็บไฟล์ jade.
  app.set("view engine", "jade"); // ตั้งค่าให้ Express ใช้ View Engine ชื่อว่า Jade

  indexRoutes(app);
  userRoutes(app);

  // sass จะ compile แปลงจาก sass ไว้เป็น css ปกติ
  app.use(
    sass({
      src: "./sass", // โฟเดอร์ที่เก็บ sass
      dest: "./public/css", // โฟเดอร์ที่เก็บ css หลังจาก compile
      outputStyle: "compressed",
      prefix: "/css", // ตัดคำว่า css ใน src และ dest เวลาเข้าถึง path
      debug: true,
    })
  );

  app.use(express.static("./public")); // ไฟล์ที่ไม่เปลี่ยนแปลงเข้าถึงได้โดยตรงเช่น ไฟล์ภาพ ไฟล์ css ไฟล์ pdf

  return app;
};

// ***************** Test Redis *****************

const setRedis = async (key, data) => {
  // redisClient.setex("test", 60, { number1: 1, number2: 2 }); / /set แบบมี expire ด้วย (เก็บไว้ 60วินาที)
  await redisClient.set(key, JSON.stringify({ obj: data }));
};

const getRedis = async (key) => {
  await redisClient.get(key, (err, data) => {
    console.log(JSON.parse(data).obj.number1);
  });
};

const delRedis = async (key) => {
  await redisClient.del(key, (err, response) => {
    response === 1 ? console.log("Deleted Successfully!") : console.log("Cannot delete");
  });
};

const temp1 = { number1: 1, number2: 2 };
const temp2 = { number1: 10, number2: 20 };
setRedis("offer:{100}", temp1);
getRedis("offer:{100}");
setRedis("offer:{100}", temp2); // Update ทับ keys เดิม
delRedis("offer:{100}");
