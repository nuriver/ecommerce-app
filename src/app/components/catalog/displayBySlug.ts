import { getProductsBySlug } from '../../api/SDK/client';
import { hideLoadIndicator } from '../../api/SDK/loadIndicator';
import pageToggle from '../../utilities/pageToggle';
import detailedProductPage from '../detailedProductPage/detailedProductPage';

export default async function displayBySlug(path: string): Promise<void> {
  const slug = path.replace('#/catalog/', '');
  const response = await getProductsBySlug(slug);
  const productsCount = response.body.count;
  if (productsCount > 0) {
    const productId = response.body.results[0].id;
    const productPage = detailedProductPage(productId);
    pageToggle(productPage);
  } else {
    window.location.href = '#/404';
  }
  hideLoadIndicator();
}
