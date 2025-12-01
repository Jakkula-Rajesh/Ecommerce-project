import { useState } from "react";

export default function Filters({ onChange }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("");
  const [minPrice, setMin] = useState("");
  const [maxPrice, setMax] = useState("");

  const apply = (e) => {
    e.preventDefault();
    onChange({ search, category, size, minPrice, maxPrice });
  };

  return (
    <form className="filters" onSubmit={apply}>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>All</option>
        <option>Men</option>
        <option>Women</option>
        <option>Kids</option>
      </select>

      <select value={size} onChange={(e) => setSize(e.target.value)}>
        <option value="">Size</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
      </select>

      <input placeholder="Min" value={minPrice} onChange={(e) => setMin(e.target.value)} />
      <input placeholder="Max" value={maxPrice} onChange={(e) => setMax(e.target.value)} />

      <button type="submit">Apply</button>
    </form>
  );
}
