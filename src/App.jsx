
import React, { useState } from "react";
import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrUpdate = (product) => {
    if (editingIndex !== null) {
      const updated = [...products];
      updated[editingIndex] = product;
      setProducts(updated);
      setEditingIndex(null);
    } else {
      setProducts([...products, product]);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  return (
    <div className="container">
      <h1 className="logo">🐾 Loki Paws</h1>
      <ProductForm onSubmit={handleAddOrUpdate} product={products[editingIndex]} />
      <div className="products-grid">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            onEdit={() => handleEdit(index)}
          />
        ))}
      </div>
    </div>
  );
}
