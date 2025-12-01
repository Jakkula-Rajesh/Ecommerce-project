import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then((res) => setOrder(res.data));
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h1>Order Placed</h1>
      <p>ID: {order._id}</p>
      <p>Date: {new Date(order.orderDate).toLocaleString()}</p>

      <h3>Items</h3>
      <ul>
        {order.items.map((i, idx) => (
          <li key={idx}>
            {i.name} ({i.size}) x{i.qty} — ₹{i.price}
          </li>
        ))}
      </ul>

      <h3>Total: ₹{order.totalPrice}</h3>
    </div>
  );
}
