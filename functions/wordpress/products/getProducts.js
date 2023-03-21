import { initializeWpApollo } from '@/lib/wordpress/connector';
import { PRODUCT_FILTER } from '@/lib/wordpress/filters/queryProducts';

/**
 * Get product data from WPGraphQL.
 *
 * @author DAP
 * @param  {number} categoryId      Cetegory ID
 * @param  {Array}  tags            Product tag array
 * @param  {number} lowerPriceRange Lower product price rage
 * @param  {number} upperPriceRange Upper product price rage
 * @param  {string} after           After hash for pagination
 * @param  {string} orderBy         Product order by enum
 * @param  {string} order           Product order direction
 * @param  {string} language        Language
 * @return {object}                 Product Data
 */
export default async function getProducts(
  categoryId,
  tags,
  lowerPriceRange,
  upperPriceRange,
  after,
  orderBy,
  order,
  language
) {
  const apolloClient = initializeWpApollo()

  console.log(categoryId,
    tags,
    lowerPriceRange,
    upperPriceRange,
    after,
    orderBy,
    order,
    language, "getProducts");

  return apolloClient
    .query({
      query: PRODUCT_FILTER,
      variables: {
        categoryId: categoryId,
        tags: tags,
        lowerPriceRange,
        upperPriceRange,
        after,
        orderBy,
        order,
        language
      }
    })
    .then((response) => response)
    .catch((error) => {
      return {
        error: true,
        errorMessage: error.message
      }
    })
}
