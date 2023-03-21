import {cartFields} from '@/lib/wordpress/_query-partials/cartFields'
import {gql} from '@apollo/client'

const APPLY_COUPON = gql`
  ${cartFields}
  mutation APPLY_COUPON($input: ApplyCouponInput!) {
    applyCoupon(input: $input) {
      cart {
        ...CART_FIELDS
      }
      applied {
        code
        discountAmount
      }
    }
  }
`

export default APPLY_COUPON
