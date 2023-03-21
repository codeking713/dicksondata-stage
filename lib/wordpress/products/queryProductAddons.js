import {gql} from '@apollo/client'

export const queryProductAddons = gql`
  query productAddons($productIds: String!) {
    productAddOns(productIds: $productIds) {
      addons {
        options {
          label
          image
          price
          price_type
        }
        name
        product_id
        composite_id
        price
        required
        adjust_price
        description
        description_enable
        max
        display
        min
        position
        price_type
        restrictions
        restrictions_type
        title_format
        type
        field_name
      }
    }
  }
`
