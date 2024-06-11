import { getProductsBySlug } from '../../api/SDK/client';
import { hideLoadIndicator } from '../../api/SDK/loadIndicator';
import getAddedToCartProducts from '../../utilities/getAddedToCartProducts';
import pageToggle from '../../utilities/pageToggle';
import detailedProductPage from '../detailedProductPage/detailedProductPage';

export default async function displayBySlug(path: string): Promise<void> {
  const slug = path.replace('#/catalog/', '');
  const response = await getProductsBySlug(slug);
  const productsCount = response.body.count;
  if (productsCount > 0) {
    const productId = response.body.results[0].id;

    const addedToCartProducts = await getAddedToCartProducts();
    if (addedToCartProducts.includes(productId)) {
      const productPage = detailedProductPage(productId, true);
      pageToggle(productPage);
    } else {
      const productPage = detailedProductPage(productId, false);
      pageToggle(productPage);
    }
  } else {
    window.location.href = '#/404';
  }
  hideLoadIndicator();
}
