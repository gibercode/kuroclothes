import { useState, useEffect } from "preact/hooks";
import Card from "../Card/Card.jsx";
import styles from "./style.module.scss";
import { normalizeProduct } from "../../utils";
import { UseCategory } from "../../hooks/useCategory";
import SearchInput from "../SearchInput";
import type { JSX } from "preact";
import { UseGetRate } from "../../hooks/useRate";
import type { ContentfulProduct } from "../../types";

export const ProductList = ({ initialData = [] }: { initialData: ContentfulProduct[] }) => {
  const { currentType } = UseCategory();
  const [products, setProducts] = useState<ContentfulProduct[]>([]);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  const filterProducts = (localProducts: ContentfulProduct[] = []) => {
    const result = localProducts.filter((item) => {
      const product = normalizeProduct(item);
      if (
        (product?.productType === currentType &&
          product?.name.toLowerCase().includes(search.toLowerCase())) ||
        (product?.productType === currentType &&
          product?.tags.some((tag: string) =>
            tag.toLowerCase().includes(search.toLowerCase())
          ))
      )
        return product;
    });
    setProducts(result);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    filterProducts(initialData);
  }, [debouncedSearch, currentType]);

  const handleChange = ({
    target,
  }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const input = target as HTMLInputElement;
    setSearch(input?.value);
  };

  const { rate } = UseGetRate();

  return (
    <>
      <SearchInput handleChange={handleChange} />
      <div className={styles.main} id="products">
        {products?.length ? (
          <div className={styles.grid}>
            {products.map((item, index) => {
              const product = normalizeProduct(item);
              return <Card {...{ ...product, ...{ key: index }, rate }} />;
            })}
          </div>
        ) : (
          <div className={styles.noResult}>
            <div className={styles.messageContainer}>
              <p>
                ¡Ups! Parece que tu búsqueda no encontró coincidencias. Si
                buscas algún otro personaje o anime contáctanos para ayudarte ⛩️
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
