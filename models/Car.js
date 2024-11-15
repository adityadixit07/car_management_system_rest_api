import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    carType: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    dealer: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    images: {
      type: [String], // Array of image URLs
      validate: [arrayLimit, "{PATH} exceeds the limit of 10"],
    },
    tags: [String], // Optional: Tags like car_type, company, etc.
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length <= 10;
}

const Car = mongoose.model("Car", carSchema);
export default Car;
