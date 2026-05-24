import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import UserModel from "./models/users.model.js";

const app = express();
dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome back to syncdev");
});

app.post("/users", async (req, res) => {
  try {
    const userData = new UserModel(req.body);
    const response = await userData.save();

    res.status(200).send("user data save successfully");
  } catch (error) {
    console.log("users data error : ", error);
    res.status(500).send("something went wrong : ", error);
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
