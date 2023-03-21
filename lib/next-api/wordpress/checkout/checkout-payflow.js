import {gql} from '@apollo/client'

const CHECKOUT_PAYFLOW_MUTATION = gql`
  query CHECKOUT_PAYFLOW_MUTATION(
    $acct: String!
    $amount: String!
    $city: String!
    $country_code: String!
    $cvv: String!
    $expdate: String!
    $first_name: String!
    $last_name: String!
    $state: String!
    $street: String!
    $zip: String!
    $order_id: Float!
  ) {
    customPaypalPayFlowField(
      acct: $acct
      amount: $amount
      city: $city
      country_code: $country_code
      cvv: $cvv
      expdate: $expdate
      first_name: $first_name
      last_name: $last_name
      state: $state
      street: $street
      zip: $zip
      order_id: $order_id
    ) {
      message
    }
  }
`

export default CHECKOUT_PAYFLOW_MUTATION
