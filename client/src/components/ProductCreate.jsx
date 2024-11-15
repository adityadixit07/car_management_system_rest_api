import React, { useState } from "react";

const ProductCreate = ({ onCreateProduct }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would make an API call here
    onCreateProduct({ ...formData, id: Date.now() });
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
