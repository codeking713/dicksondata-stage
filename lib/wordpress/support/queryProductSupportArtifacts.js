import defaultPageData from '@/lib/wordpress/_query-partials/defaultPageData'
import seoPostFields from '@/lib/wordpress/_query-partials/seoPostFields'
import {gql} from '@apollo/client'

export const supportArticleFields = `
  databaseId
  title
  link
  contentTypeName
  content
`

export const supportFaqFields = `
  databaseId
  title
  link
  contentTypeName
  support_faq_options {
    faqAnswer
  }
`

export const supportManualFields = `
  databaseId
  title
  link
  contentTypeName
  support_manual_options {
    manualFile {
      link
    }
  }
`

export const PRODUCT_SUPPORT_ARTIFACTS = gql`
  query ProductSupportArtifacts($slug: [String], $language: LanguageCodeEnum! = EN_US, $menuLanguage: LanguageCodeFilterEnum! = EN_US) {
    ${defaultPageData}
    products(where: {slugIn: $slug}) {
      edges {
        node {
          ${seoPostFields}
          productLanguage {
            nodes {
              name
              slug
            }
          }
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
            supportProductLink {
              supportArtifacts {
                ... on Support_article {
                  ${supportArticleFields}
                  translation(language: $language) {
                    ${supportArticleFields}
                  }
                }
                ... on Support_faq {
                  ${supportFaqFields}
                  translation(language: $language) {
                    ${supportFaqFields}
                  }
                }
                ... on Support_manual {
                  ${supportManualFields}
                  translation(language: $language) {
                    ${supportManualFields}
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
            supportProductLink {
              supportArtifacts {
                ... on Support_article {
                  ${supportArticleFields}
                  translation(language: $language) {
                    ${supportArticleFields}
                  }
                }
                ... on Support_faq {
                  ${supportFaqFields}
                  translation(language: $language) {
                    ${supportFaqFields}
                  }
                }
                ... on Support_manual {
                  ${supportManualFields}
                  translation(language: $language) {
                    ${supportManualFields}
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
            supportProductLink {
              supportArtifacts {
                ... on Support_article {
                  ${supportArticleFields}
                  translation(language: $language) {
                    ${supportArticleFields}
                  }
                }
                ... on Support_faq {
                  ${supportFaqFields}
                  translation(language: $language) {
                    ${supportFaqFields}
                  }
                }
                ... on Support_manual {
                  ${supportManualFields}
                  translation(language: $language) {
                    ${supportManualFields}
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
            supportProductLink {
              supportArtifacts {
                ... on Support_article {
                  ${supportArticleFields}
                  translation(language: $language) {
                    ${supportArticleFields}
                  }
                }
                ... on Support_faq {
                  ${supportFaqFields}
                  translation(language: $language) {
                    ${supportFaqFields}
                  }
                }
                ... on Support_manual {
                  ${supportManualFields}
                  translation(language: $language) {
                    ${supportManualFields}
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
