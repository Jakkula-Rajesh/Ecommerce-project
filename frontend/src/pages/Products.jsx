import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const load = async (f = {}) => {
    const query = new URLSearchParams({ ...f, page, limit: 12 }).toString();
    const res = await api.get("/products?" + query);
    setProducts(res.data.products);
    setPages(res.data.pages);
  };

  useEffect(() => { load(filters); }, [page]);

  return (
    <div>
      <h1>Products</h1>
      <Filters onChange={(f) => { setFilters(f); setPage(1); load(f); }} />

      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>{page} / {pages}</span>
        <button disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
