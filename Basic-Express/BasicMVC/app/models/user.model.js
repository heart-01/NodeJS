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
      required: true,
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
    strict: true,
  }
);

// ก่อน save ลง mongo database ให้ทำอะไรก่อน
userSchema.pre('save', (next) => {
  if (this.password) { // ถ้ามี field password
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64'); // สร้าง salt เก็บลง database
    this.password = this.hashPassword(this.password); // เรียกใช้ methods ใน schema ขื่อ hashPassword เพื่อส่งรหัสผ่านไปเข้ารหัส
  }

  next();
});

// สร้าง method ให้กับ model instance ใน userSchema
userSchema.methods.hashPassword = (password) => {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64'); // เข้ารหัส password โดยเอา salt เอาร่วมด้วย
}

// สร้าง method authenticate ใน userSchema เพื่อช็ค password
userSchema.methods.authenticate = (password) => {
  return this.password === this.hashPassword(password); // เอา password data ที่อยู่ใน schema กับ password ที่เข้ามาเข้ารหัส แล้วเช็คว่าตรงกันไหม
}

const userModel = model("User", userSchema);

export default userModel;
