import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
