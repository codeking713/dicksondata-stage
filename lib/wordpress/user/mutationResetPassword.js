import {gql} from '@apollo/client'

// Mutation: Update a user in WP.
const mutationResetPassword = gql`
  mutation resetUserPaassword(
    $key: String!
    $login: String!
    $password: String!
  ) {
    resetUserPassword(input: {key: $key, login: $login, password: $password}) {
      clientMutationId
    }
  }
`

export default mutationResetPassword
