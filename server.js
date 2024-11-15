import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbConnect.js";
import router from "./routes/manageRoutes.js";
import morgan from "morgan";
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev"));


dbConnect();

app.use("/api/1", router);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
