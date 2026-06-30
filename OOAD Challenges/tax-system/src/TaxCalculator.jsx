import { useState } from "react";
import { TaxService } from "./TaxService";

export default function TaxCalculator() {
  const [product, setProduct] = useState("notebook");
  const [state, setState] = useState("RS");
  const [year, setYear] = useState(2025);
  const [price, setPrice] = useState(1000);

  const result = TaxService.calculate({
    product,
    state,
    year,
    price,
  });

  return (
    <div>
      <h1>Tax Calculator</h1>
      <select value={product} onChange={(e) => setProduct(e.target.value)}>
        <option value="notebook">Notebook</option>
        <option value="phone">Phone</option>
        <option value="book">Book</option>
      </select>
      <select value={state} onChange={(e) => setState(e.target.value)}>
        <option>RS</option>
        <option>SP</option>
        <option>SC</option>
      </select>
      <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
        <option>2025</option>
        <option>2026</option>
      </select>
      <br />
      <input
        type="number"
        value={price}
        onChange={(e) =>
          setPrice(Number(e.target.value))
        }
      />
      <hr />
      <h2>Tax</h2>
      <p>Rate: {(result.taxRate * 100).toFixed(2)}%</p>
      <p>Tax: R$ {result.taxValue.toFixed(2)}</p>
      <p>Total: R$ {result.total.toFixed(2)}</p>
    </div>
  );
};