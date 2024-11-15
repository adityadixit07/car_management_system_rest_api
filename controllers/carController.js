import Car from "../models/Car.js";
import cloudinary from "cloudinary";

const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    return res.status(200).json({
      data: cars,
      message: "Cars retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    return res.status(200).json({
      data: car,
      message: "Car retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCar = async (req, res) => {
  // car with upto 10 images, title, description and tags
  try {
    const {
      title,
      description,
      carType,
      company,
      price,
      dealer,
      model,
      year,
      tags,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }
    const imagePromises = req.files.map((file) =>
      cloudinary.v2.uploader.upload(file.path)
    );
    const imageUrls = await Promise.all(imagePromises);
    const images = imageUrls.map((image) => image.secure_url);

    const car = new Car({
      userId: req.user.id,
      title,
      description,
      carType,
      company,
      price,
      dealer,
      model,
      year,
      images,
      tags,
    });
    await car.save();
    res.status(201).json({ message: "Car created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const {
      title,
      description,
      carType,
      company,
      price,
      dealer,
      model,
      year,
      images,
      tags,
    } = req.body;
    const car = await Car.findById(req.params.id);

    if (car.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    car.title = title;
    car.description = description;
    car.carType = carType;
    car.company = company;
    car.price = price;
    car.dealer = dealer;
    car.model = model;
    car.year = year;
    car.images = images;
    car.tags = tags;

    await car.save();
    res.status(200).json({ message: "Car updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (car.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await car.remove();
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getCars, getCarById, createCar, updateCar, deleteCar };
