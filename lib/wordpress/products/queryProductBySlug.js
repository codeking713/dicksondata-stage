import defaultPageData from '@/lib/wordpress/_query-partials/defaultPageData'
import seoPostFields from '@/lib/wordpress/_query-partials/seoPostFields'
import {gql} from '@apollo/client'

export const PRODUCT_BY_SLUG_QUERY = gql`
  query Product($slug: [String], $menuLanguage: LanguageCodeFilterEnum! = EN_US) {
    ${defaultPageData}
    products(where: {slugIn: $slug}) {
      edges {
        node {
          ${seoPostFields}
          productId: databaseId
          databaseId
          slug
          description
          type
          purchasable
          sku
          productLanguage {
            nodes {
              name
              slug
            }
          }
          productInfoTabs {
            productOverviewTab
            productManualsTab
            productSupportTab
            productSpecsTab {
              column1
              column2
              column3
              column4
              column5
              column6
            }
          }
          galleryImages {
            nodes {
              databaseId
              altText
              mediaItemUrl
              mediaDetails {
                height
                width
              }
            }
          }
          image {
            databaseId
            srcSet
            sourceUrl
            altText
            mediaDetails {
                height
                width
              }
          }
          name
          productCategories {
            edges {
              node {
                name
              }
            }
          }
          productMeta {
          nodes {
              slug
            }
          }
          ... on SimpleProduct {
            price
            onSale
            databaseId
            regularPrice
            stockStatus
            upsell {
              nodes {
                productId: databaseId
                databaseId
                name
                shortDescription
                description
                type
                purchasable
                sku
                slug
                productMeta {
                  nodes {
                      slug
                    }
                }
                image {
                  srcSet(size: MEDIUM)
                  databaseId
                  mediaItemUrl
                  altText
                  mediaDetails {
                    height
                    width
                  }
                }
                ... on SimpleProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  stockStatus
                }
                ... on VariableProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  stockStatus
                }
                ... on CompositeProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  compositePriceMin
                  compositeRegularPriceMin
                  stockStatus
                }
                ... on BundleProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  bundlePriceMin
                  bundleRegularPriceMin
                  stockStatus
                }
              }
            }
            crossSell {
              nodes {
                productId: databaseId
                databaseId
                name
                shortDescription
                description
                type
                purchasable
                sku
                slug
                image {
                  srcSet(size: MEDIUM)
                  databaseId
                  mediaItemUrl
                  altText
                  mediaDetails {
                    height
                    width
                  }
                }
                ... on SimpleProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  stockStatus
                }
                ... on VariableProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  stockStatus
                }
                ... on CompositeProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  compositePriceMin
                  compositeRegularPriceMin
                  stockStatus
                }
                ... on BundleProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  bundlePriceMin
                  bundleRegularPriceMin
                  stockStatus
                }
              }
            }
            supportProductLink {
              supportArtifacts {
                ... on Support_article {
                  slug
                  uri
                  title
                  contentTypeName
                }
                ... on Support_manual {
                  title
                  contentTypeName
                  support_manualId
                  support_manual_options {
                    manualFile {
                      fileSize
                      mimeType
                      mediaItemUrl
                    }
                  }
                }
              }
            }
          }
          ... on VariableProduct {
            price
            onSale
            databaseId
            regularPrice
            stockStatus
            attributes {
              nodes {
                name
                options
                position
                scope
                variation
                visible
                label
                attributeId
                id
                ... on GlobalProductAttribute {
                  id
                  name
                  terms (first: 100) {
                    nodes {
                      name
                      slug
                      databaseId
                    }
                  }
                }
              }
            }
            upsell {
              nodes {
                productId: databaseId
                databaseId
                name
                shortDescription
                description
                type
                purchasable
                sku
                slug
                productMeta {
                  nodes {
                      slug
                    }
                }
                image {
                  srcSet(size: MEDIUM)
                  databaseId
                  mediaItemUrl
                  altText
                  mediaDetails {
                    height
                    width
                  }
                }
                ... on SimpleProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  stockStatus
                }
                ... on VariableProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  stockStatus
                }
                ... on CompositeProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  compositePriceMin
                  compositeRegularPriceMin
                  stockStatus
                }
                ... on BundleProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  bundlePriceMin
                  bundleRegularPriceMin
                  stockStatus
                }
              }
            }
            crossSell {
              nodes {
                productId: databaseId
                databaseId
                name
                shortDescription
                description
                type
                purchasable
                sku
                slug
                image {
                  srcSet(size: MEDIUM)
                  databaseId
                  mediaItemUrl
                  altText
                  mediaDetails {
                    height
                    width
                  }
                }
                ... on SimpleProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  stockStatus
                }
                ... on VariableProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  stockStatus
                }
                ... on CompositeProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  compositePriceMin
                  compositeRegularPriceMin
                  stockStatus
                }
                ... on BundleProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  bundlePriceMin
                  bundleRegularPriceMin
                  stockStatus
                }
              }
            }
            variations(first: 100) {
              edges {
                node {
                  name
                  databaseId
                  price
                  sku
                  stockStatus
                  attributes {
                    edges {
                      node {
                        attributeId
                        label
                        id
                        name
                        value
                      }
                    }
                  }
                }
              }
            }
            supportProductLink {
              supportArtifacts {
                ... on Support_article {
                  slug
                  title
                  contentTypeName
                }
                ... on Support_manual {
                  title
                  contentTypeName
                  support_manualId
                  support_manual_options {
                    manualFile {
                      fileSize
                      mimeType
                      mediaItemUrl
                    }
                  }
                }
              }
            }
          }
          ... on CompositeProduct {
            price
            databaseId
            regularPrice
            price
            onSale
            compositePriceMin
            compositeRegularPriceMin
            databaseId
            stockStatus
            compositeComponents {
              databaseId
              quantityMin
              quantityMax
              discount
              optional
              pricedIndividually
              title
              description
              position
              options {
                nodes {
                  name
                  type
                  databaseId
                  sku
                  purchasable
                  shortDescription
                  image {
                    srcSet(size: MEDIUM)
                    databaseId
                    mediaItemUrl
                    altText
                    mediaDetails {
                      height
                      width
                    }
                  }
                  ... on SimpleProduct {
                    id
                    name
                    databaseId
                    slug
                    sku
                    price
                    stockStatus
                  }
                  ... on VariableProduct {
                    id
                    name
                    databaseId
                    slug
                    sku
                    price
                    stockStatus
                    attributes {
                      nodes {
                        name
                        options
                        position
                        scope
                        variation
                        visible
                        label
                        attributeId
                        id
                        ... on GlobalProductAttribute {
                          id
                          name
                          terms (first: 100) {
                            nodes {
                              name
                              slug
                              taxonomyName
                              databaseId
                            }
                          }
                        }
                      }
                    }
                    variations {
                      edges {
                        node {
                          name
                          databaseId
                          price
                          sku
                          stockStatus
                          attributes {
                            edges {
                              node {
                                attributeId
                                label
                                id
                                name
                                value
                              }
                            }
                          }
                        }
                      }
                    }
                    supportProductLink {
                      supportArtifacts {
                        ... on Support_article {
                          slug
                          title
                          contentTypeName
                        }
                        ... on Support_manual {
                          title
                          contentTypeName
                          support_manualId
                          support_manual_options {
                            manualFile {
                              fileSize
                              mimeType
                              mediaItemUrl
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            upsell {
              nodes {
              productId: databaseId
              databaseId
              name
              shortDescription
              description
              type
              purchasable
              sku
              slug
              productMeta {
                  nodes {
                      slug
                    }
              }
              image {
                srcSet(size: MEDIUM)
                databaseId
                mediaItemUrl
                altText
                mediaDetails {
                height
                width
                }
              }
              ... on SimpleProduct {
                id
                name
                onSale
                price: price
                regularPrice: regularPrice
                priceRaw: price(format: RAW)
                regularPriceRaw: regularPrice(format: RAW)
                stockStatus
              }
              ... on VariableProduct {
                id
                name
                onSale
                price: price
                regularPrice: regularPrice
                priceRaw: price(format: RAW)
                regularPriceRaw: regularPrice(format: RAW)
                stockStatus
              }
              ... on CompositeProduct {
                id
                name
                onSale
                price: price
                regularPrice: regularPrice
                priceRaw: price(format: RAW)
                regularPriceRaw: regularPrice(format: RAW)
                compositePriceMin
                compositeRegularPriceMin
                stockStatus
              }
              ... on BundleProduct {
                id
                name
                onSale
                price: price
                regularPrice: regularPrice
                priceRaw: price(format: RAW)
                regularPriceRaw: regularPrice(format: RAW)
                bundlePriceMin
                bundleRegularPriceMin
                stockStatus
              }
              }
            }
            crossSell {
              nodes {
                productId: databaseId
                databaseId
                name
                shortDescription
                description
                type
                purchasable
                sku
                slug
                image {
                  srcSet(size: MEDIUM)
                  databaseId
                  mediaItemUrl
                  altText
                  mediaDetails {
                    height
                    width
                  }
                }
                ... on SimpleProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  stockStatus
                }
                ... on VariableProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  stockStatus
                }
                ... on CompositeProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  compositePriceMin
                  compositeRegularPriceMin
                  stockStatus
                }
                ... on BundleProduct {
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  bundlePriceMin
                  bundleRegularPriceMin
                  stockStatus
                }
              }
            }
          }
          ... on BundleProduct {
               price
               databaseId
               regularPrice
               price
               onSale
               bundlePriceMin
               bundleRegularPriceMin
               databaseId
               stockStatus
               bundleItems {
                 edges {
                   bundledItemId
                   databaseId: bundledItemId
                   optional
                   priceIndividually
                   overrideTitle
                   discount
                   quantityMax
                   quantityMin
                   defaultQuantity
                   title
                   menuOrder
                   node {
                     databaseId
                     name
                     shortDescription
                     ... on SimpleProduct {
                       id
                       name
                       databaseId
                       slug
                       sku
                       price
                       stockStatus
                     }
                     ... on VariableProduct {
                       id
                       name
                       databaseId
                       slug
                       sku
                       price
                       stockStatus
                       attributes {
                         nodes {
                           name
                           options
                           position
                           scope
                           variation
                           visible
                           label
                           attributeId
                           id
                           ... on GlobalProductAttribute {
                             id
                             name
                             terms (first: 100) {
                               nodes {
                                 name
                                 slug
                                 taxonomyName
                                 databaseId
                               }
                             }
                           }
                         }
                       }
                       variations {
                         edges {
                           node {
                             name
                             databaseId
                             price
                             sku
                             stockStatus
                             attributes {
                               edges {
                                 node {
                                   attributeId
                                   label
                                   id
                                   name
                                   value
                                 }
                               }
                             }
                           }
                         }
                       }
                       supportProductLink {
                         supportArtifacts {
                           ... on Support_article {
                             slug
                             title
                             contentTypeName
                           }
                           ... on Support_manual {
                             title
                             contentTypeName
                             support_manualId
                             support_manual_options {
                               manualFile {
                                 fileSize
                                 mimeType
                                 mediaItemUrl
                               }
                             }
                           }
                         }
                       }
                     }
                   }
                 }
               }
               upsell {
                 nodes {
                   productId: databaseId
                   databaseId
                   name
                   shortDescription
                   description
                   type
                   purchasable
                   sku
                   slug
                   productMeta {
                    nodes {
                        slug
                      }
                  }
                   image {
                     srcSet(size: MEDIUM)
                     databaseId
                     mediaItemUrl
                     altText
                     mediaDetails {
                       height
                       width
                     }
                   }
                   ... on SimpleProduct {
                     id
                     name
                     onSale
                     price: price
                     regularPrice: regularPrice
                     priceRaw: price(format: RAW)
                     regularPriceRaw: regularPrice(format: RAW)
                     stockStatus
                   }
                   ... on VariableProduct {
                     id
                     name
                     onSale
                     price: price
                     regularPrice: regularPrice
                     priceRaw: price(format: RAW)
                     regularPriceRaw: regularPrice(format: RAW)
                     stockStatus
                   }
                   ... on CompositeProduct {
                     id
                     name
                     onSale
                     price: price
                     regularPrice: regularPrice
                     priceRaw: price(format: RAW)
                     regularPriceRaw: regularPrice(format: RAW)
                     compositePriceMin
                     compositeRegularPriceMin
                     stockStatus
                   }
                   ... on BundleProduct {
                     id
                     name
                     onSale
                     price: price
                     regularPrice: regularPrice
                     priceRaw: price(format: RAW)
                     regularPriceRaw: regularPrice(format: RAW)
                     bundlePriceMin
                     bundleRegularPriceMin
                     stockStatus
                   }
                 }
               }
               crossSell {
                 nodes {
                   productId: databaseId
                   databaseId
                   name
                   shortDescription
                   description
                   type
                   purchasable
                   sku
                   slug
                   image {
                     srcSet(size: MEDIUM)
                     databaseId
                     mediaItemUrl
                     altText
                     mediaDetails {
                       height
                       width
                     }
                   }
                   ... on SimpleProduct {
                     id
                     name
                     onSale
                     price: price
                     regularPrice: regularPrice
                     priceRaw: price(format: RAW)
                     regularPriceRaw: regularPrice(format: RAW)
                     stockStatus
                   }
                   ... on VariableProduct {
                     id
                     name
                     onSale
                     price: price
                     regularPrice: regularPrice
                     priceRaw: price(format: RAW)
                     regularPriceRaw: regularPrice(format: RAW)
                     stockStatus
                   }
                   ... on CompositeProduct {
                     id
                     name
                     onSale
                     price: price
                     regularPrice: regularPrice
                     priceRaw: price(format: RAW)
                     regularPriceRaw: regularPrice(format: RAW)
                     compositePriceMin
                     compositeRegularPriceMin
                     stockStatus
                   }
                   ... on BundleProduct {
                     id
                     name
                     onSale
                     price: price
                     regularPrice: regularPrice
                     priceRaw: price(format: RAW)
                     regularPriceRaw: regularPrice(format: RAW)
                     bundlePriceMin
                     bundleRegularPriceMin
                     stockStatus
                   }
                 }
               }
             }
          ... on ExternalProduct {
            price
            databaseId
            regularPrice
            externalUrl
          }
          ... on GroupProduct {
            products {
              nodes {
                ... on SimpleProduct {
                  id
                  price
                  regularPrice
                  stockStatus
                }
              }
            }
            id
            galleryImages {
              edges {
                node {
                  id
                  sourceUrl
                }
              }
            }
          }



        }
      }
    }
  }
`

export const PRODUCT_SLUGS = gql`
  query Products {
    products(first: 5000) {
      nodes {
        id
        slug
      }
    }
  }
`
