import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import ProductCreate from "./components/ProductCreate";
import ProductDetail from "./components/ProductDetail";

const App = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleCreateProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/products" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/products"
            element={
              user ? (
                <ProductList products={products} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/products/new"
            element={
              user ? (
                <ProductCreate onCreateProduct={handleCreateProduct} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/products/:id"
            element={
              user ? (
                <ProductDetail
                  product={products.find(
                    (p) => p.id === parseInt(useParams().id)
                  )}
                  onDelete={handleDeleteProduct}
                  onEdit={handleEditProduct}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/" element={<Navigate to="/products" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
