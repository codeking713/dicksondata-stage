import {cartFields} from '@/lib/wordpress/_query-partials/cartFields'
import {gql} from '@apollo/client'

const CHECKOUT_REVIEW = gql`
  ${cartFields}
  mutation CHECKOUT_REVIEW($input: CheckoutReviewInput!) {
    checkoutReview(input: $input) {
      clientMutationId
      cart {
        ...CART_FIELDS
      }
    }
  }
`

export default CHECKOUT_REVIEW
