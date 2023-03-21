import {gql} from '@apollo/client'

export const SUPPORT_PRODUCT_SEARCH = gql`
  query Products($searchText: String, $language: String) {
    products(
      where: {
        search: $searchText
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
      }
      first: 10
    ) {
      edges {
        node {
          ... on SimpleProduct {
            databaseId
            name
            slug
            sku
            featuredImage {
              node {
                mediaItemUrl
                mediaDetails {
                  height
                  width
                  meta {
                    title
                  }
                }
              }
            }
          }
          ... on CompositeProduct {
            databaseId
            name
            slug
            sku
            featuredImage {
              node {
                mediaItemUrl
                mediaDetails {
                  height
                  width
                  meta {
                    title
                  }
                }
              }
            }
          }
          ... on BundleProduct {
            databaseId
            name
            slug
            sku
            featuredImage {
              node {
                mediaItemUrl
                mediaDetails {
                  height
                  width
                  meta {
                    title
                  }
                }
              }
            }
          }
          ... on VariableProduct {
            databaseId
            name
            slug
            sku
            featuredImage {
              node {
                mediaItemUrl
                mediaDetails {
                  height
                  width
                  meta {
                    title
                  }
                }
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
  }
`
