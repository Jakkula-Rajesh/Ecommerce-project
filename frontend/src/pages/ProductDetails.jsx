import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const { addItem } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setP(res.data));
  }, [id]);

  if (!p) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <img src={p.image} className="detail-img" />
      <div>
        <h2>{p.name}</h2>
        <p>{p.description}</p>
        <p>₹{p.price}</p>

        <label>Size</label>
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="">Choose</option>
          {p.sizes.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <label>Qty</label>
        <input type="number" min="1" value={qty} onChange={(e) => setQty(Number(e.target.value))} />

        <button
          onClick={() => {
            if (!size) return alert("Choose size");
            addItem({ product: p._id, size, qty });
            navigate("/cart");
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
