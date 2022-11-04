import { Schema, model } from "mongoose";
import crypto from "crypto";

const userSchema = new Schema(
  {
    firstName: { 
        type: Schema.Types.String, 
        required: true 
    },
    lastName: { 
        type: Schema.Types.String, 
        required: true 
    },
    username: { 
        type: Schema.Types.String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    email: { 
        type: Schema.Types.String, 
        required: true, 
        index: true, 
        match: /.+\@.+\.+/ 
    },
    password: {
      type: Schema.Types.String,
      validate: [
        // กำหนด schema เอง
        (password) => {
          return password && password.length >= 6;
        },
        "Password must be at least 6 characters",
      ],
    },
    salt: { // ใช้เพื่อนำไปทำ password hash
      type: Schema.Types.String
    },
    provider: { // strategy ที่ user ลงทะเบียน
      type: Schema.Types.String,
      required: 'Provider is required',
    },
    providerId: { // user id ที่ได้จาก provider
      type: Schema.Types.String,
    },
    providerData: { // ไว้เก็บข้อมูลจาก OAuth provider
      type: Schema.Types.Mixed,
    },
    role: {
      type: Schema.Types.String,
      enum: ["Admin", "Owner", "User"],
    },
  },
  {
    timestamps: true,
  }
);

// ก่อน save ลง mongo database ให้ทำอะไรก่อน
userSchema.pre('save', function (next) {
  if (this.password) { // ถ้ามี field password
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64'); // สร้าง salt เก็บลง database
    this.password = this.hashPassword(this.password); // เรียกใช้ methods ใน schema ขื่อ hashPassword เพื่อส่งรหัสผ่านไปเข้ารหัส
  }
  next();
});

// สร้าง method ให้กับ model instance ใน userSchema
userSchema.methods.hashPassword = function (password) {
  return crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'md5').toString('base64'); // เข้ารหัส password โดยเอา salt เอาร่วมด้วย
}

// สร้าง method authenticate ใน userSchema เพื่อช็ค password
userSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password); // เอา password data ที่อยู่ใน schema กับ password ที่เข้ามาเข้ารหัส แล้วเช็คว่าตรงกันไหม
}


// สร้าง static method ชื่อ authenticfindUniqueUsernameate ให้กับ class userSchema เพื่อช็ค
userSchema.statics.findUniqueUsername = function (username, suffix, callback) { // callback จะรับชื่อที่ได้ไป insert ใส่ใน database เช่น function(availableUsername)
  const _this = this;
  const possibleUsername = username + (suffix || ''); // นำ username ที่เข้ามาประกอบกับ suffix

  // เช็คว่า username ซ้ำกันไหม
  _this.findOne({
    username: possibleUsername,
  }, function(err, user) {
    if (!err) {
      if (!user) callback(possibleUsername); // ถ้าไม่มี user ให้สร้าง user ใหม่ตามที่ส่ง function callback เข้ามาเรียก
      else return _this.findUniqueUsername(username, (suffix || 0) + 1, callback); // ถ้าเจอ username ซ้ำกันใน database ให้เรียก function ตัวเองกใหม่อีกครั้งโดยเพิ่มเติมคือใส่ suffix เลข 1 เติมเข้าไปต่อท้าย username ด้วย
    } else {
      callback(null); // ถ้า error ใส่ null เพื่อบอกว่าหา username ที่ unique ไม่ได้
    }
  });
}

const userModel = model("User", userSchema);

export default userModel;
