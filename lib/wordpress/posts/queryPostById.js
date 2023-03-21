import authorPostFields from '@/lib/wordpress/_query-partials/authorPostFields'
import categoriesPostFields from '@/lib/wordpress/_query-partials/categoriesPostFields'
import commentsPostFields from '@/lib/wordpress/_query-partials/commentsPostFields'
import defaultPageData from '@/lib/wordpress/_query-partials/defaultPageData'
import featuredImagePostFields from '@/lib/wordpress/_query-partials/featuredImagePostFields'
import globalPostFields from '@/lib/wordpress/_query-partials/globalPostFields'
import seoPostFields from '@/lib/wordpress/_query-partials/seoPostFields'
import tagsPostFields from '@/lib/wordpress/_query-partials/tagsPostFields'
import {gql} from '@apollo/client'

// Fragment: retrieve single post fields.
const singlePostFragment = gql`
  fragment SinglePostFields on Post {
    ${globalPostFields}
    blocksJSON
    excerpt
    ${seoPostFields}
    ${authorPostFields}
    ${featuredImagePostFields}
    ${tagsPostFields}
    ${categoriesPostFields}
    ${commentsPostFields}
  }
`
// Query: retrieve post by specified identifier.
const queryPostById = gql`
  query GET_POST_BY_ID(
    $id: ID!
    $idType: PostIdType = SLUG
    $imageSize: MediaItemSizeEnum = LARGE
    $language: LanguageCodeEnum! = EN_US
    $menuLanguage: LanguageCodeFilterEnum! = EN_US
  ) {
    ${defaultPageData}
    post(id: $id, idType: $idType) {
      ...SinglePostFields
      translation(language: $language) {
        ...SinglePageFields
      }
    }
  }
  ${singlePostFragment}
`

export default queryPostById
