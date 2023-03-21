import {gql} from '@apollo/client'

// Query: Update a user in WP.
const queryCustomerInfo = gql`
  query GetCustomerInfo($id: ID) {
    customer(id: $id) {
      billing {
        firstName
        lastName
        company
        address1
        address2
        postcode
        city
        country
        email
        phone
        state
      }
      shipping {
        firstName
        lastName
        company
        address1
        address2
        postcode
        city
        country
        email
        phone
        state
      }
    }
  }
`

export default queryCustomerInfo
