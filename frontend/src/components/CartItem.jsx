export default function CartItem({ item, onUpdateQty, onRemove }) {
  const price = item.product.price || item.product?.price || 0;

  return (
    <div className="cart-item">
      <img src={item.product.image} className="cart-item-img" />

      <div>
        <h4>{item.product.name}</h4>
        <p>Size: {item.size}</p>
        <p>₹{price}</p>

        <div>
          <button onClick={() => onUpdateQty(item.product._id, item.size, Math.max(1, item.qty - 1))}>-</button>
          <span>{item.qty}</span>
          <button onClick={() => onUpdateQty(item.product._id, item.size, item.qty + 1)}>+</button>

          <button onClick={() => onRemove(item.product._id, item.size)} style={{ color: "red" }}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
