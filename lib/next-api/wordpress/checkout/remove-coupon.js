import {cartFields} from '@/lib/wordpress/_query-partials/cartFields'
import {gql} from '@apollo/client'

const REMOVE_COUPON = gql`
  ${cartFields}
  mutation REMOVE_COUPON($input: RemoveCouponsInput!) {
    removeCoupons(input: $input) {
      clientMutationId
      cart {
        ...CART_FIELDS
      }
    }
  }
`

export default REMOVE_COUPON
