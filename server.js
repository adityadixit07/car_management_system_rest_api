import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbConnect.js";
import router from "./routes/manageRoutes.js";
import morgan from "morgan";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "*",
  credentials: true,
  accessControlAllowOrigin: "*",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
};
app.use(cors(corsOptions));

app.use(morgan("dev"));

dbConnect();

app.use("/api/1", router);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
