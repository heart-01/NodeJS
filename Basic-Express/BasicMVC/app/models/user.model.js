import { Schema, model } from "mongoose";

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

const userModel = model("User", userSchema);

export default userModel;
