import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import LoadingSkeleton from "../utils/LoadingSkeleton";

const CarProductList = () => {
  // State management
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("newest");
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 1000000 },
    carType: "all",
    year: "all",
  });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const itemsPerPage = 9;

  // Dummy data for demonstration
  const dummyData = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    title: `Car ${index + 1}`,
    description: `Description for Car ${index + 1}`,
    carType: index % 3 === 0 ? "Sedan" : index % 3 === 1 ? "SUV" : "Truck",
    company: ["Tesla", "Toyota", "Ford", "BMW", "Mercedes"][index % 5],
    price: 30000 + index * 1000,
    dealer: `Dealer ${index + 1}`,
    model: `Model ${index + 1}`,
    year: 2020 + (index % 5),
    images: ["/api/placeholder/400/300"],
    tags: ["electric", "luxury", "family"][index % 3],
  }));

  // Fetch data simulation
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCars(dummyData);
      } catch (err) {
        setError("Failed to fetch cars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Filter and sort logic
  const filteredAndSortedCars = cars
    .filter(
      (car) =>
        (car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
        car.price >= filters.priceRange.min &&
        car.price <= filters.priceRange.max &&
        (filters.carType === "all" || car.carType === filters.carType) &&
        (filters.year === "all" || car.year === parseInt(filters.year))
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return b.year - a.year;
        default:
          return 0;
      }
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedCars.length / itemsPerPage);
  const currentCars = filteredAndSortedCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12 bg-red-50 rounded-lg">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Header Section with Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search cars by name or company..."
            className="w-full px-12 py-4 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-4 text-gray-400" size={20} />
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <SlidersHorizontal size={20} />
            Filters
          </button>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Filter Menu */}
        {isFilterMenuOpen && (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Price Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 border rounded"
                    value={filters.priceRange.min}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        priceRange: {
                          ...filters.priceRange,
                          min: Number(e.target.value),
                        },
                      })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 border rounded"
                    value={filters.priceRange.max}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        priceRange: {
                          ...filters.priceRange,
                          max: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>
              </div>

              {/* Car Type */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Car Type
                </label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  value={filters.carType}
                  onChange={(e) =>
                    setFilters({ ...filters, carType: e.target.value })
                  }
                >
                  <option value="all">All Types</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Truck">Truck</option>
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium mb-2">Year</label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  value={filters.year}
                  onChange={(e) =>
                    setFilters({ ...filters, year: e.target.value })
                  }
                >
                  <option value="all">All Years</option>
                  {[2024, 2023, 2022, 2021, 2020].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {currentCars.length} of {filteredAndSortedCars.length} cars
        </p>
      </div>

      {/* Cars Grid */}
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={car.images[0]}
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{car.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{car.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    {car.carType}
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    {car.year}
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    {car.company}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-green-600">
                    ${car.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500 text-sm">{car.model}</span>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-8 h-8 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* No Results Message */}
      {!loading && currentCars.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No cars found matching your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default CarProductList;
