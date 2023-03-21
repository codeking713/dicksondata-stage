import {gql} from '@apollo/client'

export const querySupportProductByCategory = gql`
  query Products(
    $category: [String]
    $after: String
    $slug: ID!
    $language: String
  ) {
    products(
      where: {
        taxonomyFilter: {
          filters: [
            # {
            #   taxonomy: PRODUCTMETA
            #   operator: NOT_IN
            #   terms: ["hide-from-catelog"]
            # }
            {
              taxonomy: PRODUCTMETA
              operator: IN
              terms: ["includes-support-artifacts"]
            }
            {taxonomy: PRODUCTLANGUAGE, terms: [$language], operator: IN}
          ]
        }
        categoryIn: $category
      }
      first: 1000
      after: $after
    ) {
      edges {
        node {
          name
          slug
          productCategories {
            nodes {
              slug
            }
          }
          ... on VariableProduct {
            id
            name
            featuredImage {
              node {
                mediaItemUrl
                altText
                title
              }
            }
          }
          ... on SimpleProduct {
            id
            name
            featuredImage {
              node {
                mediaItemUrl
                altText
                title
              }
            }
          }
          ... on BundleProduct {
            id
            name
            featuredImage {
              node {
                mediaItemUrl
                altText
                title
              }
            }
          }
          ... on CompositeProduct {
            id
            name
            featuredImage {
              node {
                mediaItemUrl
                altText
                title
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
    productCategory(id: $slug, idType: SLUG) {
      name
      slug
      language {
        locale
      }
    }
  }
`
