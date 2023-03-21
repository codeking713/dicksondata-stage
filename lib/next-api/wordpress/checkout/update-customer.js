import {gql} from '@apollo/client'

const UPDATE_CUSTOMER_MUTATION = gql`
  mutation UPDATE_CUSTOMER_MUTATION($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      clientMutationId
      customer {
        email
        billing {
          country
          state
          postcode
          email
        }
        shipping {
          country
          state
          postcode
          email
        }
        calculatedShipping
        hasCalculatedShipping
      }
    }
  }
`

export default UPDATE_CUSTOMER_MUTATION
