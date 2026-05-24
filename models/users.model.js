import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "firstName is required"],
      minLength: [2, "This name should be at least 3 char long"],
      maxLength: [50, "firstName can bot exceed 10 char"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "lastName is required"],
      minLength: [2, "lastName should be at least 3 char long"],
      maxLength: [50, "lastName can bot exceed 10 char"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: ["8", "Password must be at least 8 char long"],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin", "superadmin", "moderator"],
        message: "{VALUE} is not a recognized system role",
      },
      default: "user",
    },
    imageURL: {
      type: String,
      match: [/^https?:\/\/.+/, "Please provide a valid image URL."],
      required: false,
    },
    bio: {
      type: String,
      maxLength: [500, "Bio cannot exceed 500 char"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [18, "you mush be at least {MIN} years old."],
      max: [80, "please enter a valid age under {MAX} years."],
      set: (v) => Math.floor(v),
    },
    gender: {
      type: String,
      required: [true, "Gender identification is required"],
      trim: true,
      enum: {
        values: ["male", "female", "prefer-not-to-say"],
        message: "'{VALUE}' is not a recognized gender option",
      },
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
