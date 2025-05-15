import { useContext, useEffect, useState, createContext } from "react";

import api from "../services/config.js";

const productsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <productsContext.Provider value={products}>
      {children}
    </productsContext.Provider>
  );
};

const useProducts = () => {
  const products = useContext(productsContext);
  return products;
};

const useProductDetails = (id) => {
  const products = useContext(productsContext);
  const result = products.find((p) => p.id === id);
  return result;
};

export { ProductsProvider, useProducts, useProductDetails };
