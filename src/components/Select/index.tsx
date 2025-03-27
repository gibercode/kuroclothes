import styles from "./styles.module.scss";
import { $productCategory } from "../../store/productCategory";
import { useState } from "preact/hooks";

export const Select = () => {
  const [current, setCurrent] = useState("t-shirt");

  const handleChange = (event: any) => {
    const { value } = event.target;
    $productCategory.set(value);
    setCurrent(value);
  };
  return (
    <div className={styles.main}>
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
