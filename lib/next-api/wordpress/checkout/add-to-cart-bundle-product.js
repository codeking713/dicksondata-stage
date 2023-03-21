import {cartFields} from '@/lib/wordpress/_query-partials/cartFields'
import {gql} from '@apollo/client'

const ADD_TO_CART_BUNDLE_PRODUCT = gql`
  ${cartFields}
  mutation ADD_TO_CART_BUNDLE_PRODUCT($input: AddToCartProductBundleInput!) {
    addToCartProductBundle(input: $input) {
      cart {
        ...CART_FIELDS
      }
      cartItem {
        key
      }
    }
  }
`

export default ADD_TO_CART_BUNDLE_PRODUCT
