import {cartFields} from '@/lib/wordpress/_query-partials/cartFields'
import {gql} from '@apollo/client'
/**
 * Remove item from cart
 *
 * This query is used for removing items from the cart
 */
const REMOVE_FROM_CART = gql`
  ${cartFields}
  mutation REMOVE_FROM_CART($input: RemoveItemsFromCartInput!) {
    removeItemsFromCart(input: $input) {
      cart {
        ...CART_FIELDS
      }
    }
  }
`

export default REMOVE_FROM_CART
