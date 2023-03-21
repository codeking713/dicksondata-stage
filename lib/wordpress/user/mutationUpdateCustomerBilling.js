import {gql} from '@apollo/client'

// Mutation: Update customer's billing details in WP.
const mutationUpdateCustomerBilling = gql`
  mutation UpdateCustomerBilling(
    $id: ID!
    $firstName: String
    $lastName: String
    $email: String
    $address1: String
    $city: String
    $country: CountriesEnum
    $state: String
    $phone: String
    $address2: String
    $company: String
    $postcode: String
  ) {
    updateCustomer(
      input: {
        billing: {
          state: $state
          phone: $phone
          lastName: $lastName
          firstName: $firstName
          email: $email
          country: $country
          city: $city
          address1: $address1
          postcode: $postcode
          company: $company
          address2: $address2
        }
        id: $id
      }
    ) {
      clientMutationId
    }
  }
`

export default mutationUpdateCustomerBilling
