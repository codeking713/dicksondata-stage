import {gql} from '@apollo/client'

// Query: Get user in WP.
const queryUserInfo = gql`
  query GetCustomerInfo($id: ID!) {
    user(idType: ID, id: $id) {
      id
      firstName
      lastName
      email
      username
      nickname
    }
  }
`

export default queryUserInfo
