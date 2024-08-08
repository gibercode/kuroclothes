import { useState, useMemo } from "preact/hooks";
import Card from "../Card/Card.jsx";
import styles from "./style.module.scss";
import { normalizeProduct } from "../../utils";
import { UseCategory } from "../../hooks/useCategory.js";
import SearchInput from "../SearchInput";
import type { JSX } from "preact";

export const ProductList = ({ initialData = [] }) => {
  const { currentType } = UseCategory();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const filterProducts = (localProducts = []) => {
    const result = localProducts.filter((item) => {
      const product = normalizeProduct(item);
      if (
        product?.productType === currentType &&
        product?.name.toLowerCase().includes(search.toLowerCase())
      )
        return product;
    });
    setProducts(result);
  };

  useMemo(() => {
    filterProducts(initialData);
  }, [initialData, currentType, search]);

  const handleChange = ({
    target,
  }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const input = target as HTMLInputElement;
    setSearch(input?.value);
  };

  return (
    <>
      <SearchInput handleChange={handleChange} />
      <div className={styles.main} id="products">
        {products?.length ? (
          <div className={styles.grid}>
            {products.map((item, index) => {
              const product = normalizeProduct(item);
              return <Card {...{ ...product, ...{ key: index } }} />;
            })}
          </div>
        ) : (
          <div className={styles.noResult}>
            <div className={styles.messageContainer}>
              <p>
                "¡Ups! Parece que tu búsqueda no encontró coincidencias.
                ¿Quieres intentar con otro término o explorar nuestra web?"
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
