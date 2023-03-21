import {nextApiRoutes} from '@/lib/next-api/connector'
import {gql} from '@apollo/client'

// Query: retrieve product posts by post type.
const queryProductDetails = gql`
  query GET_PRODUCT_DETAILS(
    $postType: String!
    $cursor: String!
    $orderBy: String = DATE
    $order: String = DESC
  ) {
    products(
      postType: $postType
      cursor: $cursor
      orderBy: $orderBy
      order: $order
    ) @rest(type: "Products", path: "${nextApiRoutes.wordpress.products}?{args}") {
      pagination
      posts
    }
  }
`

export default queryProductDetails
