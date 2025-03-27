import { useState } from "preact/hooks";
import styles from "./styles.module.scss";
import { $productCategory } from "../../store/productCategory";

export const Tabs = () => {
  const [left, setLeft] = useState(0)
  const [current, setCurrent] = useState(0);

  const handleCategory = (currentTab: number, category: string, left: number) => {
    $productCategory.set(category);
    setCurrent(currentTab);
    setLeft(left)
  };

  return (
    <div className={`${styles.main} products-container`}>
      <div className={styles.container}>
        <input type="radio" name="slider" checked={current === 0} />
        <input
          type="radio"
          name="slider"
          id="top"
          checked={current === 1}
          className={styles.radioTop}
        ></input>
           <input
          type="radio"
          name="slider"
          id="tote-bag"
          checked={current === 2}
          className={styles.radioTop}
        ></input>
        <nav className={styles.nav}>
          <label
            className={styles.tshirt}
            onClick={() => handleCategory(0, "t-shirt", 0)}
          >
            T-shirts
          </label>
          <label
            className={styles.top}
            onClick={() => handleCategory(1, "top", 33.3)}
          >
            Tops
          </label>
          <label
            className={styles.top}
            onClick={() => handleCategory(2, "tote-bag", 66.6)}
          >
            Tote bags
          </label>
          <div className={styles.slider} style={{ left: `${left}%`}}></div>
        </nav>
      </div>
    </div>
  );
};
