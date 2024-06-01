import { Product, ProductProjection } from '@commercetools/platform-sdk';
import { ProductData } from '../../types/types';

export function getProductDataFromProductProjection(apiProduct: ProductProjection): ProductData {
  const productId = apiProduct.id;
  const productName = apiProduct.name.en;
  const productImages = apiProduct.masterVariant.images;
  if (!productImages) throw new Error('No images for this product');
  const imageUrl = productImages[0].url;
  const smallImageUrl = imageUrl.replace(/(\.[^.]+$)/, '-medium$1');
  if (!apiProduct.description) throw new Error('No description for this product');
  const productDescription = apiProduct.description.en;
  const productPrices = apiProduct.masterVariant.prices;
  if (!productPrices) throw new Error('No prices for this product');
  const productPrice = (productPrices[0].value.centAmount / 100).toFixed(2);
  const discountPrice = productPrices[0].discounted?.value.centAmount;

  const productData: ProductData = {
    name: productName,
    description: productDescription,
    image: smallImageUrl,
    price: productPrice,
    id: productId,
  };

  if (discountPrice) {
    productData.discountPrice = (discountPrice / 100).toFixed(2);
  }

  return productData;
}

export default function getProductDataFromProduct(apiProduct: Product): ProductData {
  const product = apiProduct.masterData.current;
  const productId = apiProduct.id;
  const productName = product.name.en;
  const productImages = product.masterVariant.images;
  if (!productImages) throw new Error('No images for this product');
  const imageUrl = productImages[0].url;
  const smallImageUrl = imageUrl.replace(/(\.[^.]+$)/, '-medium$1');
  if (!product.description) throw new Error('No description for this product');
  const productDescription = product.description.en;
  const productPrices = product.masterVariant.prices;
  if (!productPrices) throw new Error('No prices for this product');
  const productPrice = (productPrices[0].value.centAmount / 100).toFixed(2);
  const discountPrice = productPrices[0].discounted?.value.centAmount;

  const productData: ProductData = {
    name: productName,
    description: productDescription,
    image: smallImageUrl,
    price: productPrice,
    id: productId,
  };

  if (discountPrice) {
    productData.discountPrice = (discountPrice / 100).toFixed(2);
  }

  return productData;
}
