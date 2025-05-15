import BasketCard from "../components/BasketCard";
import BasketSideBar from "../components/BasketSideBar";

import { useCart } from "../context/CartContext";

import styles from "../styles/Checkout.module.css";

const CheckoutPage = () => {
  const [state, dispatch] = useCart();
  console.log(state);

  if (!state.itemsCounter)
    return (
      <p style={{ textAlign: "center", fontSize: "2rem", height: "100vh" }}>
        Your cart is empty !
      </p>
    );

  return (
    <div className={styles.container}>
      <BasketSideBar state={state} dispatch={dispatch} />
      <div className={styles.products}>
        {state.selectedItems.map((product) => (
          <BasketCard key={product.id} data={product} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
};

export default CheckoutPage;
