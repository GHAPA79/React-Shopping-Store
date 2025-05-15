import { Navigate, Route, Routes } from "react-router";
import { ProductsProvider } from "./context/ProductsContext";

import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import CheckoutPage from "./pages/CheckoutPage";
import PageNotFound from "./pages/404";
import CartProvider from "./context/CartContext";
import Layout from "./layout/Layout";

const App = () => {
  return (
    // we put cart and products provider up of layout beacuse we need to show data state
    // in header from cart context.
    <CartProvider>
      <ProductsProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to={"/products"} replace />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </ProductsProvider>
    </CartProvider>
  );
};

export default App;
