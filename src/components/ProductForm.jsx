
import React, { useState, useEffect } from "react";

export default function ProductForm({ onSubmit, product }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    status: "In Stock",
    quantity: "",
    image: null,
  });

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: "", category: "", price: "", status: "In Stock", quantity: "", image: null });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required />
      <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" type="number" required />
      <select name="status" value={form.status} onChange={handleChange}>
        <option>In Stock</option>
        <option>Out of Stock</option>
      </select>
      <input name="image" type="file" onChange={handleChange} accept="image/*" />
      <button type="submit">{product ? "Update" : "Add Product"}</button>
    </form>
  );
}
