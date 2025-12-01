import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="card-img" />
      </Link>
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
    </div>
  );
}
