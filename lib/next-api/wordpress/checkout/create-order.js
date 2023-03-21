import {gql} from '@apollo/client'

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($input: CreateOrderInput!) {
    createOrder(input: $input) {
      clientMutationId
      order {
        id
        orderKey
        orderNumber
        status
        refunds {
          nodes {
            amount
          }
        }
      }
    }
  }
`

export default CREATE_ORDER_MUTATION
