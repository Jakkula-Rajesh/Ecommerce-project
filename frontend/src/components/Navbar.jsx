import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <Link to="/" className="brand">Clothify</Link>
      <div>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart ({cart.items.length})</Link>
        {user ? (
          <>
            <span>{user.name || user.email}</span>
            <button onClick={() => { logout(); navigate("/"); }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
