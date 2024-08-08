import { useState, useEffect, useMemo } from "preact/hooks";
import styles from "./styles.module.scss";
import { DetailModal } from "../DetailModal";
import { UseCategory } from "../../hooks";

const Card = ({
  name,
  type,
  price,
  front,
  back,
  size,
}: Record<string, any>) => {
  const { currentType } = UseCategory();
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [product, setProduct] = useState<any>(null);

  const handleMobile = (state: boolean) => setIsMobile(state);

  useMemo(() => {
    if (isMobile && currentType === "t-shirt") return setCurrentImage("back");
    if (currentImage !== "t-shirt") setCurrentImage(null);
  }, [currentType, isMobile]);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(max-width: 768px)");
    desktopMediaQuery.addEventListener("change", (event) => {
      const { matches } = event;
      if (matches) {
        setCurrentImage(back ? "back" : "front");
        handleMobile(true);
        return;
      }
      handleMobile(false);
      setCurrentImage("front");
    });

    if (window.innerWidth < 768) {
      setIsMobile(true);
      setCurrentImage(back ? "back" : "front");
    }

    return () => {
      desktopMediaQuery.removeEventListener("change", () => {});
    };
  }, []);

  const selectProduct = () => {
    const localProduct = { name, type, price, front, back, size };
    setProduct(localProduct);
  };

  const handleClose = () => {
    setProduct(null);
  };

  const handleStyles = () => {
    if (!currentImage) return null;
    if (isMobile && currentType === "t-shirt") return `${styles.outNoFade}`;
    if (currentImage === "back" && back && !isMobile) return styles.outImage;
    if (currentImage === "front" && back && !isMobile) return styles.inImage;
  };

  const handleOut = () => {
    if (!currentImage) return null;
    if (isMobile && currentType === "t-shirt") return `${styles.InNoFade}`;
    if (currentImage === "back" && back && !isMobile) return styles.inImage;
    if (currentImage === "front" && back && !isMobile) return styles.outImage;
  };

  return (
    <>
      <div
        className={styles.card}
        onMouseEnter={
          !isMobile
            ? () => setCurrentImage(back ? "back" : "only-front")
            : () => {}
        }
        onMouseLeave={!isMobile ? () => setCurrentImage("front") : () => {}}
        onClick={selectProduct}
      >
        <div className={styles.cardHeader}>
          <p className={styles.sizes}>{size || "S / M / L"}</p>
          <div style={{ display: "flex" }}>
            {(currentImage === "back" ||
              isMobile ||
              currentImage === "only-front") && (
              <div className={styles.openDetail} onClick={selectProduct}>
                <img
                  src="/plus.png"
                  alt="plus icon"
                  width={11}
                  height={11}
                ></img>
              </div>
            )}
          </div>
        </div>
        <div className={styles.img}>
          <div className={styles.imageParent}>
            <img
              src={front}
              alt={`${name} front`}
              width="100%"
              height={back ? "100%" : "auto"}
              style={{ zIndex: 2 }}
              className={`${styles.cardImage} ${handleStyles()}`}
              loading="lazy"
              decoding="async"
            />

            {back && (
              <img
                src={back}
                alt={`${name} back`}
                width="100%"
                height="100%"
                className={`${styles.cardImage} ${handleOut()}`}
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
        </div>
        <div>
          <div className={styles.row}>
            <div className={styles.leftSide}>
              <h2 className={styles.title}>{name}</h2>
              <p className={styles.text}>{type}</p>
            </div>
            <div className={styles.price}>
              <h2 className={styles.text}>{price}</h2>
            </div>
          </div>
        </div>
      </div>
      {product && <DetailModal product={product} onClose={handleClose} />}
    </>
  );
};

export default Card;
