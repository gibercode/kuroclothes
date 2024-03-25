import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { Image } from "astro:assets";

const Card = ({ name, type, price, front, back }: any) => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleMobile = (state: boolean) => setIsMobile(state);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(max-width: 768px)");
    desktopMediaQuery.addEventListener("change", (event) => {
      const { matches } = event;
      if (matches) {
        setCurrentImage("back");
        handleMobile(true);
        return;
      }
      handleMobile(false);
      setCurrentImage("front");
    });

    if (window.innerWidth < 768) {
      setIsMobile(true);
      setCurrentImage("back");
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

  return (
    <div
      className={styles.card}
      onMouseEnter={!isMobile ? () => setCurrentImage("back") : () => {}}
      onMouseLeave={!isMobile ? () => setCurrentImage("front") : () => {}}
      onClick={isMobile ? handleImage : () => {}}
    >
      <div className={styles.cardHeader}>
        <p className={styles.sizes}>S / M / L</p>
        <div style={{ display: "flex" }}>
          {isMobile && (
            <p className={`${styles.text} ${styles.smallFont}`}>
              Doble estampado
            </p>
          )}
          <img
            src={`swap-icon.png`}
            alt="mockup"
            width={15}
            className={styles.sizes}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <div className={styles.img}>
        <div className={styles.imageParent}>
          <img
            src={`/products/${front}.png`}
            alt="mockup"
            width="100%"
            height="100%"
            style={{ zIndex: 2 }}
            className={`${styles.cardImage} ${
              currentImage === "back"
                ? styles.outImage
                : currentImage && styles.inImage
            }`}
            loading="lazy"
            decoding="async"
          />
          <img
            src={`/products/${back}.png`}
            alt="mockup"
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
  );
};

export default Card;
