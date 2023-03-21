import {gql} from '@apollo/client'

// Query: Get customer orders from WP.
const querySingleOrderDetails = gql`
  query GetSingleOrderDetails($orderID: Int) {
    customer {
      orders(where: {include: [$orderID]}) {
        edges {
          node {
            date
            orderNumber
            databaseId
            paymentMethod
            paymentMethodTitle
            hasShippingAddress
            hasBillingAddress
            status
            shipping {
              address1
              address2
              city
              company
              country
              email
              firstName
              lastName
              postcode
              phone
              state
            }
            currency
            subtotal
            totalTax
            total
            status
            shippingTotal
            shippingTax
            discountTotal
            discountTax
            lineItems {
              nodes {
                total
                totalTax
                subtotalTax
                subtotal
                quantity
                productId
                metaData {
                  key
                  value
                  id
                }
                product {
                  id
                  productId: databaseId
                  name
                  shortDescription
                  databaseId
                  sku
                  image {
                    id
                    sourceUrl
                    srcSet
                    altText
                    title
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
                variation {
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
                  }
                  id
                  name
                  onSale
                  price: price
                  regularPrice: regularPrice
                  priceRaw: price(format: RAW)
                  regularPriceRaw: regularPrice(format: RAW)
                  # attributes {
                  #   id
                  #   name
                  #   value
                  # }
                }
              }
            }
            billing {
              address1
              address2
              city
              company
              country
              email
              firstName
              lastName
              phone
              state
              postcode
            }
            metaData {
              key
              value
            }
          }
        }
      }
    }
  }
`

export default querySingleOrderDetails
