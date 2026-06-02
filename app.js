import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDatabase } from "./config/database.js";
import UserModel from "./models/users.model.js";
import { userValidation } from "./utils/userValidation.js";

const app = express();
dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome back to syncdev");
});

// signup
app.post("/signup", async (req, res) => {
  try {
    // validate body
    const { error, value } = userValidation.validate(req.body);
    if (error) {
      throw Error(error);
    }

    // hashing password
    const { password, ...restBody } = value;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // save users data to DB.
    const userData = new UserModel({
      ...restBody,
      password: hashPassword,
    });

    await userData.save();

    res.status(200).send("user data save successfully");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // check email id is exist.
    const users = await UserModel.findOne({ email }).select("+password");
    if (!users) {
      throw new Error("Invalid credentials");
    }
    // validate password using bcryptjs
    const isPasswordCorrect = await bcrypt.compare(password, users.password);
    if (!isPasswordCorrect) throw new Error("Invalid credentials");
    // generate tokens
    const token = jwt.sign({ _id: users._id }, process.env.JWT_SECERET, {
      expiresIn: "1d",
    });
    // set to cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    // send response
    res.status(200).json({
      status: true,
      data: {
        _id: users._id,
        email: users.email,
        name: `${users.firstName} ${users.lastName}`,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

connectDatabase()
  .then(() => {
    console.log("Database connected successfully!!");
    app.listen(3500, () => {
      console.log("server running on 3500 port");
    });
  })
  .catch((err) => {
    console.log("something went wrong with server", err);
  });
