import {gql} from '@apollo/client'

export const PRODUCT_FILTER = gql`
  query Products(
    $tags: [Int]
    $categoryId: Int
    $lowerPriceRange: Float
    $upperPriceRange: Float
    $after: String
    $orderBy: ProductsOrderByEnum = DATE
    $order: OrderEnum = DESC
  ) {
    products(
      first: 9
      after: $after
      where: {
        tagIdIn: $tags
        categoryId: $categoryId
        categoryNotIn: "Discontinued"
        minPrice: $lowerPriceRange
        maxPrice: $upperPriceRange
        orderby: {field: $orderBy, order: $order}
        taxonomyFilter: {
          filters: [
            {
              taxonomy: PRODUCTMETA
              terms: ["hide-from-catelog"]
              operator: NOT_IN
            }
          ]
        }
      }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        databaseId
        name
        slug
        description
        shortDescription
        purchasable
        type
        sku
        productMeta {
          nodes {
            slug
          }
        }
        image {
          altText
          mediaItemUrl
          mediaDetails {
            height
            width
          }
        }
        ... on SimpleProduct {
          price
          priceRaw: price(format: RAW)
          regularPrice
          regularPriceRaw: regularPrice(format: RAW)
          salePrice
          onSale
          stockStatus
        }
        ... on VariableProduct {
          price
          priceRaw: price(format: RAW)
          regularPrice
          regularPriceRaw: regularPrice(format: RAW)
          salePrice
          onSale
          stockStatus
        }
        ... on CompositeProduct {
          price
          priceRaw: price(format: RAW)
          regularPrice
          regularPriceRaw: regularPrice(format: RAW)
          compositePriceMin
          compositeRegularPriceMin
          salePrice
          onSale
          stockStatus
        }
        ... on BundleProduct {
          price
          priceRaw: price(format: RAW)
          regularPrice
          regularPriceRaw: regularPrice(format: RAW)
          bundlePriceMin
          bundleRegularPriceMin
          salePrice
          onSale
          stockStatus
        }
      }
    }
  }
`
