import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { cart, updateItems, removeItem } = useContext(CartContext);
  const navigate = useNavigate();

  const onUpdateQty = (productId, size, qty) => {
    const items = cart.items.map((i) =>
      i.product === productId && i.size === size ? { ...i, qty } : i
    );
    updateItems(items);
  };

  const total = cart.items.reduce(
    (s, i) => s + (i.product.price || 0) * i.qty,
    0
  );

  return (
    <div>
      <h1>Cart</h1>

      {cart.items.map((it, idx) => (
        <CartItem
          key={idx}
          item={it}
          onUpdateQty={onUpdateQty}
          onRemove={removeItem}
        />
      ))}

      <h3>Total: ₹{total}</h3>
      <button onClick={() => navigate("/checkout")}>Checkout</button>
    </div>
  );
}
