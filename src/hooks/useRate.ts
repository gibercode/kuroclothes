import { useState, useEffect } from "preact/hooks";

export const UseGetRate = () => {
  const [rate, setRate] = useState(null);

  const getRate = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_DOLLAR_API}?page=bcv&monitor=usd`
      );
      const { price } = await response.json();
      setRate(price);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getRate();
  }, []);

  return { rate };
};
