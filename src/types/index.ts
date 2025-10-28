import type { JSX } from "preact";

export interface Product {
  name: string;
  price: string;
  size: string;
  front: string;
  back: string | null;
  type: string;
  productType: string;
  tags: string[];
  onlyFront: boolean;
}

export interface ContentfulAsset {
  fields: {
    file: {
      url: string;
    };
  };
}

export interface ContentfulProductFields {
  name: string;
  price: string;
  size: string;
  front_image: ContentfulAsset;
  back_image?: ContentfulAsset;
  tshirtType: string;
  type: string;
  tags?: string[];
}

export interface ContentfulProduct {
  fields: ContentfulProductFields;
}

export interface RateResponse {
  fuente: string;
  promedio: number;
}

export interface CardProps {
  name: string;
  type: string;
  price: string;
  front: string;
  back: string | null;
  size: string;
  rate: number | null;
  onlyFront: boolean;
}

export interface DetailModalProps {
  product: {
    name: string;
    type: string;
    price: string;
    front: string;
    back: string | null;
    size: string;
  };
  onClose: () => void;
  rate: number | null;
}

export interface SearchInputProps {
  handleChange?: (event: JSX.TargetedEvent<HTMLInputElement, Event>) => void;
}

export interface ToastProps {
  text: string;
  status: number;
}

export type ProductCategory = "t-shirt" | "top" | "tote-bag";
