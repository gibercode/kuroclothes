import { useState, useEffect } from "preact/hooks";
import { $productCategory } from "../store/productCategory";

export const UseCategory = () => {
  const [currentType, setCurrentType] = useState("");

  useEffect(() => {
    const unsubscribe = $productCategory.subscribe((value) => {
      setCurrentType(value);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { currentType };
};
