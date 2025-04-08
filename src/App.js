import "./styles.css";
import { useEffect, useState } from "react";
export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };
  console.log(products);

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((product) => {
            return (
              <span className="products__single" key={product.id}>
                <img src={product.thumbnail} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ◀
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span>1</span>
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < products.length / 10 ? "" : "pagination__disable"}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}
