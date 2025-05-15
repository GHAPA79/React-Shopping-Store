import { TbListDetails, TbShoppingBagCheck } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { productQuantity, shortenText } from "../helpers/helper";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";

import styles from "../styles/Card.module.css";

const Card = ({ data }) => {
  const { id, title, image, price } = data;

  const [state, dispatch] = useCart();

  const quantity = productQuantity(state, id);

  const addToCartHandler = (type) => {
    dispatch({ type, payload: data });
  };

  return (
    <div className={styles.card}>
      <img src={image} alt={shortenText(title)} />
      <h3>{shortenText(title)}</h3>
      {/* shortenText is in helper folder */}
      <p>{price} $</p>
      <div className={styles.actions}>
        <Link to={`/products/${id}`}>
          <TbListDetails />
        </Link>
        <div>
          {quantity === 1 && (
            <button onClick={() => addToCartHandler("REMOVE_ITEM")}>
              <MdDeleteOutline />
            </button>
          )}
          {quantity > 1 && (
            <button onClick={() => addToCartHandler("DECREASE")}>-</button>
          )}
          {!!quantity && <span>{quantity}</span>}
          {quantity === 0 ? (
            <button onClick={() => addToCartHandler("ADD_ITEM")}>
              <TbShoppingBagCheck />
            </button>
          ) : (
            <button onClick={() => addToCartHandler("INCREASE")}>+</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
