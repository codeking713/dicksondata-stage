import {cartFields} from '@/lib/wordpress/_query-partials/cartFields'
import {gql} from '@apollo/client'

const ADD_TO_CART_COMPOSITE_PRODUCT = gql`
  ${cartFields}
  mutation ADD_TO_CART_COMPOSITE_PRODUCT(
    $input: AddToCartProductCompositeInput!
  ) {
    addToCartProductComposite(input: $input) {
      cart {
        ...CART_FIELDS
      }
      cartItem {
        key
      }
    }
  }
`

export default ADD_TO_CART_COMPOSITE_PRODUCT
