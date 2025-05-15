import { Link, useParams } from "react-router";
import { useProductDetails } from "../context/ProductsContext";
import { SiOpenproject } from "react-icons/si";
import { IoMdPricetag } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";

import Loader from "../components/Loader";

import styles from "../styles/ProductDetails.module.css";

const ProductDetails = () => {
  const { id } = useParams();
  // useParams returns the id in string format!

  const productDetails = useProductDetails(+id);

  if (!productDetails) return <Loader />;

  console.log(productDetails);

  return (
    <div className={styles.container}>
      <img src={productDetails.image} alt={productDetails.title} />
      <div className={styles.information}>
        <h3 className={styles.title}>{productDetails.title}</h3>
        <p className={styles.description}>{productDetails.description}</p>
        <p className={styles.category}>
          <SiOpenproject />
          {productDetails.category}
        </p>
        <div>
          <span className={styles.price}>
            <IoMdPricetag />
            {productDetails.price} $
          </span>
          <Link to={"/products"}>
            <FaArrowLeft />
            <span>Back to shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
