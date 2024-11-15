import express from "express";
import { login, register } from "../controllers/authController.js";
import {
  createCar,
  deleteCar,
  getCarById,
  getCars,
  updateCar,
} from "../controllers/carController.js";
import upload from "../utils/imageUploadCloudinary.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// auth
router.post("/login", login);
router.post("/register", register);

// car
router.get("/cars", protect, getCars);
router.get("/cars/:id", protect, getCarById);
router.post("/cars", protect, upload.array("images", 10), createCar);
router.put("/cars/:id", protect, updateCar);
router.delete("/cars/:id", protect, deleteCar);

export default router;
