
import React from "react";

export default function ProductCard({ product, onEdit }) {
  return (
    <div className="product-card">
      {product.image && <img src={product.image} alt={product.title} className="product-img" />}
      <h2>{product.title}</h2>
      <p>{product.category}</p>
      <p>MUR {product.price}</p>
      <p>Qty: {product.quantity}</p>
      <p className={product.status === "In Stock" ? "instock" : "outstock"}>{product.status}</p>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
}
