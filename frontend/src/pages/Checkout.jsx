import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function Checkout() {
  const { user } = useContext(AuthContext);
  const { cart, placeOrder } = useContext(CartContext);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");

    const res = await placeOrder(address);
    navigate(`/order/${res.orderId}`);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={submit}>
        <textarea
          required
          placeholder="Shipping address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}
