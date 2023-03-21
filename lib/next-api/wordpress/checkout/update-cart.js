import {cartFields} from '@/lib/wordpress/_query-partials/cartFields'
import {gql} from '@apollo/client'
/**
 * Update Cart
 *
 * This query is used for both updating the items in the cart and delete a cart item.
 * When the cart item needs to be deleted, we should pass quantity as 0 in the input along with other fields.
 */
const UPDATE_CART = gql`
  ${cartFields}
  mutation UPDATE_CART($input: UpdateItemQuantitiesInput!) {
    updateItemQuantities(input: $input) {
      cart {
        ...CART_FIELDS
      }
    }
  }
`

export default UPDATE_CART
