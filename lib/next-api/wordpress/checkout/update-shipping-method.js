import {gql} from '@apollo/client'

const UPDATE_SHIPPING_METHOD = gql`
  mutation UPDATE_SHIPPING_METHOD($input: UpdateShippingMethodInput!) {
    updateShippingMethod(input: $input) {
      cart {
        chosenShippingMethods
        availableShippingMethods {
          packageDetails
          supportsShippingCalculator
          rates {
            methodId
            cost
            id
            label
          }
        }
      }
      clientMutationId
    }
  }
`

export default UPDATE_SHIPPING_METHOD
