import {gql} from '@apollo/client'

const REFRESH_TOTALS = gql`
  mutation REFRESH_TOTALS($input: RefreshTotalsInput!) {
    refreshTotals(input: $input) {
      clientMutationId
    }
  }
`

export default REFRESH_TOTALS
