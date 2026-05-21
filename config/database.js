import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@sync-dev0.zsog9af.mongodb.net/syncdev?retryWrites=true&w=majority`
    );
  } catch (error) {
    throw error;
  }
};
