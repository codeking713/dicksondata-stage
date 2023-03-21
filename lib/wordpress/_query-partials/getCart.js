import {gql} from '@apollo/client'
import {cartFields} from './cartFields'

const GET_CART = gql`
  query GET_CART {
    cart {
      ...CART_FIELDS
    }
  }
  ${cartFields}
`

export default GET_CART
