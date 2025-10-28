import styles from "./styles.module.scss";
import { $productCategory } from "../../store/productCategory";
import { useState } from "preact/hooks";
import type { JSX } from "preact";
import type { ProductCategory } from "../../types";

export const Select = () => {
  const [current, setCurrent] = useState<ProductCategory>("t-shirt");

  const handleChange = (event: JSX.TargetedEvent<HTMLSelectElement, Event>): void => {
    const { value } = event.currentTarget;
    $productCategory.set(value as ProductCategory);
    setCurrent(value as ProductCategory);
  };
  return (
    <div className={`${styles.main} products-container`}>
      <select
        name="types"
        className={styles.select}
        value={current}
        onChange={handleChange}
      >
        <option value="t-shirt">T-shirt</option>
        <option value="top">Crop top</option>
        <option value="tote-bag">Tote bag</option>
      </select>
    </div>
  );
};

export default Select;
