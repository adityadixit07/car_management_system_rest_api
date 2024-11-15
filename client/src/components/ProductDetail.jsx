import { useState } from "react";

const ProductDetail = ({ product, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(product);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
