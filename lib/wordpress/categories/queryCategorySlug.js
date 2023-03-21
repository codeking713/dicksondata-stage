import {gql} from '@apollo/client'

export const CATEGORY_SLUGS = gql`
  query Categories {
    productCategories(first: 5000) {
      nodes {
        id
        slug
        language {
          locale
        }
      }
    }
  }
`
