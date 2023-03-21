import {gql} from '@apollo/client'

const UPDATE_ORDER_MUTATION = gql`
  mutation UPDATE_ORDER_MUTATION($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
      clientMutationId
      order {
        date
        orderNumber
        databaseId
        paymentMethod
        paymentMethodTitle
        orderKey
        subtotal
        totalTax
        total
        status
        customer {
          email
          sessionToken
          billing {
            email
          }
        }
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
        billing {
          address1
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
        lineItems {
          nodes {
            total
            totalTax
            subtotalTax
            subtotal
            quantity
            productId
            product {
              id
              name
              databaseId
              onSale
            }
          }
        }
      }
    }
  }
`

export default UPDATE_ORDER_MUTATION
