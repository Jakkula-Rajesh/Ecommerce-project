import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(() => {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : { items: [] };
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const load = async () => {
      if (user) {
        const res = await api.get("/cart");
        setCart({ items: res.data.items || [] });
      }
    };
    load();
  }, [user]);

  const addItem = (item) => {
    const exists = cart.items.find(
      (i) => i.product === item.product && i.size === item.size
    );
    let updated;

    if (exists) {
      updated = cart.items.map((i) =>
        i.product === item.product && i.size === item.size
          ? { ...i, qty: i.qty + item.qty }
          : i
      );
    } else {
      updated = [...cart.items, item];
    }

    setCart({ items: updated });
  };

  const updateItems = (items) => setCart({ items });

  const removeItem = (productId, size) => {
    setCart({
      items: cart.items.filter(
        (i) => !(i.product === productId && i.size === size)
      ),
    });
  };

  const placeOrder = async (address) => {
    const res = await api.post("/orders", { shippingAddress: address });
    setCart({ items: [] });
    return res.data;
  };

  return (
    <CartContext.Provider
      value={{ cart, addItem, updateItems, removeItem, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};
