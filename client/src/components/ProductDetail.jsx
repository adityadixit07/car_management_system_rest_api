import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Dummy data for demonstration
  const carData = {
    id: 1,
    title: "Tesla Model 3 Long Range AWD",
    description:
      "Experience the future of driving with the Tesla Model 3 Long Range AWD. This all-electric sedan combines luxury, performance, and sustainability in one stunning package.",
    carType: "Sedan",
    company: "Tesla",
    price: 54990,
    dealer: "Tesla Motors Downtown",
    model: "Model 3",
    year: 2024,
    mileage: 0,
    transmission: "Automatic",
    fuelType: "Electric",
    features: [
      "Autopilot",
      "Premium Sound System",
      "Glass Roof",
      "Heated Seats",
      "360° Camera System",
      '19" Sport Wheels',
    ],
    specifications: {
      range: "358 miles",
      acceleration: "4.2s 0-60 mph",
      topSpeed: "145 mph",
      battery: "82 kWh",
      seating: "5 adults",
      cargo: "23 cu ft",
    },
    images: Array(10).fill("https://static.toiimg.com/photo/80387978.cms"),
    tags: ["electric", "luxury", "sedan", "awd"],
    location: "San Francisco, CA",
    contactPhone: "(555) 123-4567",
    contactEmail: "sales@teslamotors.com",
  };

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % carData.images.length);
  };

  const previousImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + carData.images.length) % carData.images.length
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
        <div className="grid grid-cols-5 gap-2 mb-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} />
        Back to Listings
      </button>

      {/* Image Gallery */}
      <div className="mb-8">
        {/* Main Image */}
        <div className="relative h-[500px] mb-4 rounded-lg overflow-hidden group">
          <img
            src={carData.images[selectedImage]}
            alt={`${carData.title} - Image ${selectedImage + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrows */}
          <button
            onClick={previousImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {carData.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square rounded-lg overflow-hidden ${
                selectedImage === index ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <img
                src={image}
                alt={`${carData.title} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Car Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{carData.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {carData.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-600 mb-6">{carData.description}</p>

          {/* Specifications */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(carData.specifications).map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm capitalize">{key}</p>
                  <p className="font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-2 gap-2">
              {carData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price and Contact */}
        <div className="md:col-span-1">
          <div className="sticky top-4 bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-6">
              <p className="text-3xl font-bold text-green-600">
                ${carData.price.toLocaleString()}
              </p>
              <p className="text-gray-600">Plus taxes & licensing</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Year</span>
                <span className="font-semibold">{carData.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Make</span>
                <span className="font-semibold">{carData.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Model</span>
                <span className="font-semibold">{carData.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Mileage</span>
                <span className="font-semibold">
                  {carData.mileage.toLocaleString()} miles
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transmission</span>
                <span className="font-semibold">{carData.transmission}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fuel Type</span>
                <span className="font-semibold">{carData.fuelType}</span>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Contact Dealer
              </button>
              <div className="text-center">
                <p className="font-semibold">{carData.dealer}</p>
                <p className="text-gray-600">{carData.location}</p>
                <p className="text-gray-600">{carData.contactPhone}</p>
                <p className="text-gray-600">{carData.contactEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
