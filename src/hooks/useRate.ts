import { useState, useEffect } from "preact/hooks";
import type { RateResponse } from "../types";

export const UseGetRate = () => {
  const [rate, setRate] = useState<number | null>(null);

  const getRate = async (): Promise<void> => {
    try {
      const response = await fetch(import.meta.env.PUBLIC_DOLLAR_API);

      if (!response.ok) {
        throw new Error("Failed to fetch rate");
      }

      const result: RateResponse[] = await response.json();
      const rateData = result.find(
        ({ fuente }: RateResponse) => fuente === "oficial"
      );
      setRate(rateData?.promedio ?? null);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getRate();
  }, []);

  return { rate };
};
