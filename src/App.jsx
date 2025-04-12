import { useState } from "react";
export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🐾 Loki Paws</h1>
      <p>Your one-stop shop for cat accessories in Mauritius!</p>
      <button onClick={() => setCount(count + 1)}>Click Me ({count})</button>
    </div>
  );
}