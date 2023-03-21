import {gql} from '@apollo/client'

export const PRODUCT_TAGS_LIST = gql`
  query ProductPriceRange($minPrice: Float = 0, $maxPrice: Float = 99999) {
    products(where: {minPrice: $minPrice, maxPrice: $maxPrice}) {
      nodes {
        ... on SimpleProduct {
          id
          price(format: RAW)
        }
        ... on VariableProduct {
          id
          price(format: RAW)
        }
      }
    }
  }
`
