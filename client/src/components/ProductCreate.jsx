import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaUpload } from "react-icons/fa"; // For upload icon

const ProductCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Prepare the form data
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("carType", data.carType);
    formData.append("company", data.company);
    formData.append("price", data.price);
    formData.append("dealer", data.dealer);
    formData.append("model", data.model);
    formData.append("year", data.year);
    formData.append("tags", data.tags);
    images.forEach((image) => formData.append("images", image));

    try {
      // Call API to create the car
      const response = await axios.post(
        "http://localhost:5000/api/cars",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Car added successfully!");
        // Redirect to another page or clear form
      }
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Error adding car.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length + images.length > 10) {
      alert("You can only upload up to 10 images.");
    } else {
      setImages([...images, ...files]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Create New Car
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Car Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.title && (
            <span className="text-red-500 text-xs">{errors.title.message}</span>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.description && (
            <span className="text-red-500 text-xs">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Car Type */}
        <div className="mb-4">
          <label
            htmlFor="carType"
            className="block text-sm font-medium text-gray-700"
          >
            Car Type
          </label>
          <input
            type="text"
            id="carType"
            {...register("carType", { required: "Car type is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.carType && (
            <span className="text-red-500 text-xs">
              {errors.carType.message}
            </span>
          )}
        </div>

        {/* Company */}
        <div className="mb-4">
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            {...register("company", { required: "Company is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.company && (
            <span className="text-red-500 text-xs">
              {errors.company.message}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            {...register("price", { required: "Price is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.price && (
            <span className="text-red-500 text-xs">{errors.price.message}</span>
          )}
        </div>

        {/* Dealer */}
        <div className="mb-4">
          <label
            htmlFor="dealer"
            className="block text-sm font-medium text-gray-700"
          >
            Dealer
          </label>
          <input
            type="text"
            id="dealer"
            {...register("dealer", { required: "Dealer is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.dealer && (
            <span className="text-red-500 text-xs">
              {errors.dealer.message}
            </span>
          )}
        </div>

        {/* Model */}
        <div className="mb-4">
          <label
            htmlFor="model"
            className="block text-sm font-medium text-gray-700"
          >
            Model
          </label>
          <input
            type="text"
            id="model"
            {...register("model", { required: "Model is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.model && (
            <span className="text-red-500 text-xs">{errors.model.message}</span>
          )}
        </div>

        {/* Year */}
        <div className="mb-4">
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700"
          >
            Year
          </label>
          <input
            type="number"
            id="year"
            {...register("year", { required: "Year is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.year && (
            <span className="text-red-500 text-xs">{errors.year.message}</span>
          )}
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Tags (Optional)
          </label>
          <input
            type="text"
            id="tags"
            {...register("tags")}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Images Upload */}
        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Images (Max 10)
          </label>
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <div className="mt-2">
            {images.length > 0 && (
              <div className="flex space-x-2">
                {Array.from(images).map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt="Car"
                    className="h-20 w-20 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isSubmitting ? "Submitting..." : "Create Car"}
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
