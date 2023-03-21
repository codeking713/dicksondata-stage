/**
 * Format Support Artifact Data
 *
 * @param  {object} data Raw product data
 * @return {object}      Formatted product dat
 */
export const formatSupportArtificatData = (data) => {
  if (!data) return null

  var artifacts = []
  if (data.products.edges.length > 0) {
    for (let i = 0; i < data.products.edges.length; i++) {
      //We initially extract the products
      var givenProduct = data.products.edges?.[i].node
      var product = {
        id: givenProduct?.databaseId,
        name: givenProduct?.name,
        slug: givenProduct?.slug,
        type: 'PRODUCTS',
        sku: givenProduct?.sku,
        image: {
          mediaItemUrl: givenProduct?.featuredImage?.node?.mediaItemUrl,
          altText: givenProduct?.featuredImage?.node?.mediaDetails?.meta.title,
          height: givenProduct?.featuredImage?.node?.mediaDetails?.height,
          width: givenProduct?.featuredImage?.node?.mediaDetails?.width
        }
      }
      artifacts.push(product)
    }

    //Then we extract the artifacts tagged to the product
    // if (givenProduct?.supportProductLink?.supportArtifacts?.length > 0) {
    //   for (
    //     let j = 0;
    //     j < givenProduct.supportProductLink.supportArtifacts.length;
    //     j++
    //   ) {
    //     const article = givenProduct.supportProductLink.supportArtifacts[j]
    //     artifacts.push({
    //       id: article.databaseId,
    //       name: article.title,
    //       link: article.link,
    //       type: article.__typename.replace('Support_', '').toUpperCase()
    //     })
    //   }
  }

  return artifacts
}
