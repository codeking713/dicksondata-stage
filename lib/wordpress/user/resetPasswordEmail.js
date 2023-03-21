import {gql} from '@apollo/client'

// Mutation: Update a user in WP.
const mutationsendPasswordResetEmail = gql`
  mutation sendPasswordResetEmail($username: String!) {
    sendPasswordResetEmail(input: {username: $username}) {
      user {
        id
        email
        databaseId
      }
    }
  }
`

export default mutationsendPasswordResetEmail
