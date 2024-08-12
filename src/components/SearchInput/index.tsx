import styles from "./styles.module.scss";

export const SearchInput = ({
  handleChange,
}: {
  handleChange?: (event: any) => void;
}) => {
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
