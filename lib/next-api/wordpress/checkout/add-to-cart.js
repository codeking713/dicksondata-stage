import {cartFields} from '@/lib/wordpress/_query-partials/cartFields'
import {gql} from '@apollo/client'

const ADD_TO_CART = gql`
  ${cartFields}
  mutation ADD_TO_CART($input: AddToCartInput!) {
    addToCart(input: $input) {
      cart {
        ...CART_FIELDS
      }
      cartItem {
        key
      }
    }
  }
`

export default ADD_TO_CART
