'use strict';
require('dotenv').config()

// ตัวแปร config sequelize
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';  // เลือกการ config จากไฟล์ sequelize ว่าเป็นโหมดอะไร
const config = require('../sequelize')[env]; // กำหนดตำแหน่งที่อยู่ไฟล์ config sequelize
const db = {};

// เรียกใช้งานการกำหนด sequelize จากตัวแปรด้านบน
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// file system
fs
  .readdirSync(__dirname)

  // filter แสกนค้นหาไฟล์ที่ลงท้ายด้วย js และไม่ใช่ไฟล์ basename คือ ไฟล์ index.js ที่อยู่ในโฟเดอร์ models
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })

  // หลังจากที่ค้นหาไฟล์ในโฟเดอร์ model ที่ลงท้ายด้วย js แล้วสร้าง table ตาม model
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
