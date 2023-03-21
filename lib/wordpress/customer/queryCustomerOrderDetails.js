import {gql} from '@apollo/client'

// Query: Get customer orders from WP.
const queryCustomerOrderDetails = gql`
  query GetCustomerOrderDetails {
    customer {
      orders {
        edges {
          node {
            date
            orderNumber
            total
            status
            lineItems {
              nodes {
                productId
              }
            }
          }
        }
      }
    }
  }
`

export default queryCustomerOrderDetails
