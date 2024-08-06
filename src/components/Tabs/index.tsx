import { useState, useEffect } from "preact/hooks";
import styles from "./styles.module.scss";
import { $productCategory } from "../../store/productCategory";

export const Tabs = () => {
  const [current, setCurrent] = useState(0);

  const handleCategory = (currentTab: number, category: string) => {
    $productCategory.set(category);
    setCurrent(currentTab);
  };

  return (
    <div className={styles.main} id="products">
      <div className={styles.container}>
        <input type="radio" name="slider" checked={current === 0} />
        <input
          type="radio"
          name="slider"
          id="top"
          checked={current === 1}
          className={styles.radioTop}
        ></input>
        <nav className={styles.nav}>
          <label
            className={styles.tshirt}
            onClick={() => handleCategory(0, "t-shirt")}
          >
            T-shirts
          </label>
          <label
            className={styles.top}
            onClick={() => handleCategory(1, "top")}
          >
            Tops
          </label>
          <div className={styles.slider}></div>
        </nav>
      </div>
    </div>
  );
};
