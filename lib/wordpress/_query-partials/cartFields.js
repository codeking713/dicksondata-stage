import {gql} from '@apollo/client'

export const cartFields = gql`
  fragment CART_FIELDS on Cart {
    contents {
      nodes {
        key
        quantity
        subtotal
        tax
        total
        addons: extraData {
          id
          value
          key
        }
        extraData {
          id
          value
          key
        }
        product {
          node {
            id
            productId: databaseId
            name
            shortDescription
            type
            onSale
            slug
            sku
            type
            averageRating
            reviewCount
            image {
              id
              sourceUrl
              srcSet
              altText
              title
              mediaDetails {
                height
                width
              }
            }
            galleryImages {
              nodes {
                id
                sourceUrl
                srcSet
                altText
                title
                mediaDetails {
                  height
                  width
                }
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
            }
            ... on VariableProduct {
              id
              name
              onSale
              price: price
              regularPrice: regularPrice
              priceRaw: price(format: RAW)
              regularPriceRaw: regularPrice(format: RAW)
            }
            ... on CompositeProduct {
              id
              name
              onSale
              price: price
              regularPrice: regularPrice
              priceRaw: price(format: RAW)
              regularPriceRaw: regularPrice(format: RAW)
            }
            ... on BundleProduct {
              id
              name
              onSale
              price: price
              regularPrice: regularPrice
              priceRaw: price(format: RAW)
              regularPriceRaw: regularPrice(format: RAW)
            }
          }
        }
        variation {
          node {
            id
            productId: databaseId
            name
            type
            onSale
            slug
            sku
            image {
              id
              sourceUrl
              srcSet
              altText
              title
              mediaDetails {
                height
                width
              }
            }
            id
            name
            onSale
            price: price
            regularPrice: regularPrice
            priceRaw: price(format: RAW)
            regularPriceRaw: regularPrice(format: RAW)
          }
          attributes {
            id
            name
            value
          }
        }
        quantity
        total
        subtotal
        subtotalTax
      }
    }
    appliedCoupons {
      code
      description
      discountAmount
      discountTax
    }
    subtotal
    subtotalTax
    shippingTax
    shippingTotal
    total
    totalTax
    feeTax
    feeTotal
    discountTax
    discountTotal
    chosenShippingMethods
    availableShippingMethods {
      packageDetails
      rates {
        id
        cost
        label
        methodId
      }
      supportsShippingCalculator
    }
  }
`
