import {gql} from '@apollo/client'

export const PRODUCT_BY_ID_QUERY = gql`
  query GET_PRODUCT($id: ID!) {
    product(id: $id, idType: DATABASE_ID) {
      id
      databaseId
      name
      shortDescription
      description
      onSale
      slug
      productMeta {
        nodes {
          slug
        }
      }
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
      }
      ... on VariableProduct {
        price
        regularPrice
        salePrice
      }
      ... on CompositeProduct {
        price
        regularPrice
        salePrice
      }
      ... on BundleProduct {
        price
        regularPrice
        salePrice
      }
      imageMeta: image {
        altText
        mediaItemUrl
        mediaDetails {
          height
          width
          sizes {
            height
            width
          }
        }
      }
    }
  }
`
