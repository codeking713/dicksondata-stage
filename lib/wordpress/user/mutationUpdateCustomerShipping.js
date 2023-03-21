import {gql} from '@apollo/client'

// Mutation: Update a customer's shipping details in WP.
const mutationUpdateCustomerShipping = gql`
  mutation UpdateCustomerShipping(
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
        shipping: {
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

export default mutationUpdateCustomerShipping
