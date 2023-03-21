import {gql} from '@apollo/client'

const CHECKOUT_MUTATION = gql`
  mutation CHECKOUT_MUTATION($input: CheckoutInput!) {
    checkout(input: $input) {
      clientMutationId
      order {
        databaseId
        id
        orderKey
        orderNumber
        status
        currency
        total
        totalTax
        shippingTotal
        refunds {
          nodes {
            amount
          }
        }
        billing {
          firstName
          lastName
          company
          address1
          address2
          city
          country
          postcode
          email
          phone
        }
        lineItems {
          nodes {
            quantity
            subtotal
            totalTax
            total
            product {
              name
              sku
            }
          }
        }
      }
      result
      redirect
    }
  }
`

export default CHECKOUT_MUTATION
