import Card from "../Card/Card.jsx";
import styles from "./style.module.scss";
import { normalizeProduct } from "../../utils";
import { UseCategory } from "../../hooks/useCategory.js";

export const ProductList = ({ initialData = [] }) => {
  const { currentType } = UseCategory();

  const filterProducts = (products = []) => {
    return products.filter(
      (item) => normalizeProduct(item).productType === currentType
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.grid}>
        {filterProducts(initialData).map((item, index) => {
          const product = normalizeProduct(item);
          return <Card {...product} key={index} />;
        })}
      </div>
    </div>
  );
};
