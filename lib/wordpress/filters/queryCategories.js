import {gql} from '@apollo/client'
// FIXME: rewrite query for productCategories
export const PRODUCT_CATEGORIES = gql`
  query ProductCategories($categoryIDs: [ID]) {
    productCategories(where: {termTaxonomId: $categoryIDs}) {
      nodes {
        id
        databaseId
        name
        count
        slug
      }
    }
  }
`
