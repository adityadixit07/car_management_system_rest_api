import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Product Manager</h1>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-white">Welcome, {user.email}</span>
            <button
              onClick={onLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="text-white hover:text-blue-200">
              Login
            </Link>
            <Link to="/signup" className="text-white hover:text-blue-200">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
