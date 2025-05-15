import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";

import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => {
  const [state] = useCart();
  return (
    <>
      <header className={styles.header}>
        <Link to={"/"}>SwimSmarT Shop</Link>
        <Link to={"/checkout"}>
          <div>
            <PiShoppingCartSimpleBold />
            {!!state.itemsCounter && <span>{state.itemsCounter}</span>}
          </div>
        </Link>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>// Developed by Saman Ghapanuri //</p>
      </footer>
    </>
  );
};

export default Layout;
