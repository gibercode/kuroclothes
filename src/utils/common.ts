import type { ContentfulProduct, Product } from "../types";

export const normalizeProduct = (item: ContentfulProduct): Product => ({
  name: item?.fields?.name ?? "",
  price: item?.fields?.price ?? "",
  size: item?.fields?.size ?? "",
  front: item?.fields?.front_image?.fields?.file?.url ?? "",
  back: item?.fields?.back_image?.fields?.file?.url ?? null,
  type: item?.fields?.tshirtType ?? "",
  productType: item?.fields?.type ?? "",
  tags: item?.fields?.tags ?? [],
  onlyFront: !item?.fields?.back_image?.fields?.file?.url,
});
