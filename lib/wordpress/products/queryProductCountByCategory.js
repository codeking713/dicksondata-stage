import {gql} from '@apollo/client'

export const queryProductCountByCategory = gql`
  query productCountByCategory($category: String) {
    productCategories(where: {search: $category}) {
      edges {
        node {
          count
        }
      }
    }
  }
`
