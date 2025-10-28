import styles from "./styles.module.scss";
import type { SearchInputProps } from "../../types";

export const SearchInput = ({
  handleChange,
}: SearchInputProps) => {
  return (
    <div className={styles.main}>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          placeholder="Buscar..."
          onInput={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchInput;
