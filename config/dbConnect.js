import mongoose from "mongoose";
export const dbConnect = async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Database connected");
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
