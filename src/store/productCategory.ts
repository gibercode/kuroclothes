import { atom } from "nanostores";
import type { ProductCategory } from "../types";

export const $productCategory = atom<ProductCategory>("t-shirt");
