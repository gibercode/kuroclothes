import { useState, useRef, useEffect } from "preact/hooks";
import styles from "./styles.module.scss";
import { v4 as uuidv4 } from "uuid";
import { Toast } from "../Toast";
import { devices } from "../../utils";
import { UseCategory } from "../../hooks";
import { dictionary } from "../../utils";
import { RETURN_URL, translateProductType } from "../../utils";

export const DetailModal = ({ product, onClose }: any) => {
  const { currentType } = UseCategory();
  const basePrice = parseInt(product?.price?.replace("$", ""));
  const [price, setPrice] = useState(basePrice);
  const sizes = product?.size.includes("/")
    ? product?.size.split(" /")
    : product?.size;
  const [counter, setCounter] = useState(1);
  const [currentSize, setSize] = useState(
    product?.size.includes("/") ? sizes?.[0]?.trim() : product?.size
  );
  const [mainImage, setMainImage] = useState(product?.front);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const handleMainImage = (image: string) => setMainImage(image);
  const handleSize = (size: string) => setSize(size);
  const [status, setStatus] = useState(0);
  const timeout = useRef<any>(null);

  const handleAdd = () => {
    if (counter >= 1)
      setCounter((prev: any) => {
        const result = prev + 1;
        setPrice(result * basePrice);
        return prev + 1;
      });
  };

  const handleMinus = () => {
    if (counter >= 2)
      setCounter((prev) => {
        const result = prev - 1;
        setPrice(result * basePrice);
        return prev - 1;
      });
  };

  const handleToast = () => {
    setStatus(1);
    timeout.current = setTimeout(() => {
      setStatus(2);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    };
  }, []);

  const messageComponent = () => {
    return currentType === "tote-bag" ? (
      <p className={styles.margintext}>
        Tote bag de tela drill es la combinación perfecta de resistencia y
        diseño. Con un estampado en DTF de alta calidad, ofrece durabilidad y un
        acabado nítido que se adapta a cualquier estilo.
      </p>
    ) : (
      <>
        <p className={styles.margintext}>
          {dictionary[currentType]} 100% de algodón, cuello redondo. Su tejido
          suave y transpirable te mantendrá fresco y cómodo durante todo el día.
        </p>

        <div
          className={`${styles.allDescription} ${opened ? styles.opened : ""}`}
        >
          <p className={styles.margintext}>
            El estampado DTF de alta calidad aporta un toque único y
            personalizado a la prenda, haciéndola destacar entre la multitud.
            Ideal para cualquier ocasión.
          </p>
          <p className={styles.margintext}>
            En caso de no disponer en stock la talla deseada, escríbenos
            directamente a nuestro WhatsApp y te ayudaremos!
          </p>
        </div>
        <p className={styles.seeMore} onClick={handleSeeMore}>
          Ver {!opened ? "más +" : "menos -"}
        </p>
      </>
    );
  };

  const buyProduct = async (): Promise<unknown> => {
    const uuid: any = uuidv4();
    const id = uuid.replaceAll("-", "");
    const payload: any = {
      env: {
        terminalType: "APP",
      },
      merchantTradeNo: id.toUpperCase(),
      orderAmount: price,
      currency: "USDT",
      description: `${product?.name} ${
        product?.type
      } | Cantidad: ${counter} - Talla: ${currentSize.trim()}`,
      returnUrl: RETURN_URL,
      goodsDetails: [
        {
          goodsType: "01",
          goodsCategory: "3000",
          referenceGoodsId: id.toUpperCase(),
          goodsName: product?.name,
          goodsDetail: `${product?.name} ${
            product?.type
          } | Cantidad: ${counter} - Talla: ${currentSize.trim()}`,
        },
      ],
    };

    try {
      setLoading(true);
      const response: any = await fetch(
        import.meta.env.PUBLIC_BACKEND_URL || "",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();

      if (new RegExp(devices.join("|")).test(navigator.userAgent)) {
        return window.open(result?.data?.deeplink, "_self");
      }
      window.open(result?.data?.universalUrl, "_self");
    } catch (err) {
      handleToast();
    } finally {
      setLoading(false);
    }
  };

  const buildMessage = () => {
    const title = "¡Hola! me gustaría comprar:";
    const body = `${counter} ${translateProductType[product.type]} de ${
      product?.name
    } en talla ${currentSize.trim()}`;
    const text = encodeURIComponent(`${title}\n\n${body}`);
    return text;
  };

  const redirectToWhatsapp = () => {
    const text = buildMessage();
    const url = `https://wa.me/584242877044?text=${text}`;
    window.open(url, "_blank");
  };

  const handleSeeMore = (): void => setOpened((prev: boolean) => !prev);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.closeContainer} onClick={onClose}>
          <img loading="lazy" src="/close.png" alt="mockup" width="18px" />
        </div>
        <div className={styles.row}>
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <img src={mainImage} width="100%" />
            </div>

            {product?.back && (
              <>
                <div className={styles.images}>
                  <div
                    className={styles.imageContainer}
                    onClick={() => handleMainImage(product.front)}
                  >
                    <img src={product?.front} width={85} />
                  </div>
                  <div
                    className={styles.imageContainer}
                    onClick={() => handleMainImage(product.back)}
                  >
                    <img src={product?.back} width={85} />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={styles.content}>
            <div>
              <div className={styles.titleContainer}>
                <h2 className={styles.title}>{product?.name}</h2>
              </div>
              {messageComponent()}
              <div className={styles.sizeContainer}>
                {Array.isArray(sizes) ? (
                  sizes.map((size: string) => (
                    <div
                      className={
                        currentSize === size ? styles.sizeSelected : styles.size
                      }
                      onClick={() => handleSize(size)}
                    >
                      <h2 className={styles.text}>{size}</h2>
                    </div>
                  ))
                ) : (
                  <p className={styles.uniqueSize}>{sizes}</p>
                )}
              </div>
              <div className={styles.quantity}>
                <button onClick={handleMinus}>-</button>
                <p>{counter}</p>
                <button onClick={handleAdd}>+</button>
              </div>
            </div>
            <div>
              <div className={styles.btnContainer}>
                <div className={styles.priceContainer}>
                  <h2 className={styles.price}>{price}$</h2>
                </div>
                <button className={styles.buyBtn} onClick={redirectToWhatsapp}>
                  Comprar
                  {!loading ? (
                    <img
                      src="/cart.png"
                      alt="cart-icon"
                      width={18}
                      height={18}
                    />
                  ) : (
                    <span className={styles.loader} />
                  )}
                </button>
                <Toast
                  text="Ha ocurrido un error al intentar procesar el pago"
                  status={status}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
