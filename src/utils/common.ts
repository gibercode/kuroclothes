export const normalizeProduct = (item: any) => ({
  name: item?.fields?.name,
  price: item?.fields?.price,
  size: item?.fields?.size,
  front: item?.fields?.front_image?.fields?.file?.url,
  back: item?.fields?.back_image?.fields?.file?.url,
  type: item?.fields?.tshirtType,
  productType: item?.fields?.type,
});
