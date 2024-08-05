import { useState, useEffect } from "preact/hooks";
import styles from "./styles.module.scss";
import { DetailModal } from "../DetailModal";

const Card = ({ name, type, price, front, back, size }: any) => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [product, setProduct] = useState<any>(null);

  const handleMobile = (state: boolean) => setIsMobile(state);

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

  const handleImage = () => {
    currentImage === "back"
      ? setCurrentImage("front")
      : setCurrentImage("back");
  };

  const selectProduct = () => {
    const localProduct = { name, type, price, front, back, size };
    setProduct(localProduct);
  };

  const handleClose = () => {
    setProduct(null);
  };

  return (
    <>
      <div
        className={styles.card}
        onMouseEnter={
          !isMobile && back ? () => setCurrentImage("back") : () => {}
        }
        onMouseLeave={!isMobile ? () => setCurrentImage("front") : () => {}}
        onClick={selectProduct}
      >
        <div className={styles.cardHeader}>
          <p className={styles.sizes}>{size || "S / M / L"}</p>
          <div style={{ display: "flex" }}>
            {(currentImage === "back" || isMobile) && (
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
              className={`${styles.cardImage} ${
                currentImage === "back"
                  ? styles.outImage
                  : currentImage && styles.inImage
              }`}
              loading="lazy"
              decoding="async"
            />

            {back && (
              <img
                src={back}
                alt={`${name} back`}
                width="100%"
                height="100%"
                className={`${styles.cardImage} ${
                  currentImage === "back"
                    ? styles.inImage
                    : currentImage && styles.outImage
                }`}
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
