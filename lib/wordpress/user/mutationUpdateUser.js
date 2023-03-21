import {gql} from '@apollo/client'

// Mutation: Update a user in WP.
const mutationUpdateUser = gql`
  mutation UpdateUser(
    $id: ID!
    $firstName: String
    $lastName: String
    $email: String
    $nickname: String
    $password: String
  ) {
    updateUser(
      input: {
        lastName: $lastName
        firstName: $firstName
        email: $email
        nickname: $nickname
        id: $id
        password: $password
      }
    ) {
      clientMutationId
      user {
        email
        username
        nickname
        firstName
        lastName
      }
    }
  }
`

export default mutationUpdateUser
