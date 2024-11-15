import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import ProductCreate from "./components/ProductCreate";
import ProductDetail from "./components/ProductDetail";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
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
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductCreate />} />

          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/" element={<Navigate to="/products" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
