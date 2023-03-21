import {gql} from '@apollo/client'

export const PRODUCT_TAGS_LIST = gql`
  query ProductTags {
    productTags(first: 1000, where: {order: ASC}) {
      nodes {
        name
        id
        databaseId
        slug
        products {
          nodes {
            productCategories {
              nodes {
                databaseId
                name
              }
            }
          }
        }
      }
    }
  }
`
