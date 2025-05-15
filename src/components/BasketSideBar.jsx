import { BsPatchCheck } from "react-icons/bs";
import { FaHashtag } from "react-icons/fa";
import { TbChecklist } from "react-icons/tb";

import styles from "../styles/BasketSideBar.module.css";

const BasketSideBar = ({ state, dispatch }) => {
  const checkoutHadler = (type) => dispatch({ type });
  return (
    <div className={styles.sidebar}>
      <div>
        <TbChecklist />
        <p>Total :</p>
        <span>{state.totalPrice}</span>
      </div>
      <div>
        <FaHashtag />
        <p>Quantity :</p>
        <span>{state.itemsCounter}</span>
      </div>
      <div>
        <BsPatchCheck />
        <p>Status :</p>
        <span>{!state.checkout && "Pending..."}</span>
      </div>
      <button onClick={() => checkoutHadler("CHECKOUT")}>Checkout</button>
    </div>
  );
};

export default BasketSideBar;
