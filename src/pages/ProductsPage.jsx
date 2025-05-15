import { useProducts } from "../context/ProductsContext";
import { useEffect, useState } from "react";
import { FaListUl } from "react-icons/fa";
import { useSearchParams } from "react-router";
import { categories } from "../constants/list";

import Card from "../components/Card";
import Loader from "../components/Loader";
import styles from "../styles/ProductsPage.module.css";

import {
  createQueryObject,
  filterProductsByCategory,
  getInitialQuery,
  searchProducts,
} from "../helpers/helper";

const ProductsPage = () => {
  const products = useProducts();

  const [display, setDisplay] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  // useSearchParams hook is for get url's query from browser.
  const [loading, setLoading] = useState(false);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  useEffect(() => {
    setDisplay(products);
    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearchParams(query); // the parameter must be an object.
    setSearch(query.search || "");

    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProductsByCategory(finalProducts, query.category);

    setDisplay(finalProducts);
  }, [query]);

  const searchHandler = (event) => {
    const search = event.target.value.toLocaleLowerCase().trim();
    setSearch(search);
    setQuery((query) => createQueryObject(query, { search }));
  };

  const categoryHandler = (event) => {
    const { tagName } = event.target;
    const category = event.target.innerText.toLowerCase();

    if (tagName !== "LI") return;
    setQuery((query) => createQueryObject(query, { category }));
  };

  return (
    <>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={searchHandler}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.products}>
          {!display.length && <Loader />}
          {display.map((p) => (
            <Card key={p.id} data={p} />
          ))}
        </div>
        <div className={styles.sidebar}>
          <div>
            <FaListUl />
            <p>Categories</p>
          </div>
          <ul onClick={categoryHandler}>
            {categories.map((item) => (
              <li
                key={item.id}
                className={
                  item.type.toLowerCase() === query.category
                    ? styles.selected
                    : null
                }
              >
                {item.type}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
