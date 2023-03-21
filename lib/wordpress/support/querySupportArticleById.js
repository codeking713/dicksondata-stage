import defaultPageData from '@/lib/wordpress/_query-partials/defaultPageData'
import globalPostFields from '@/lib/wordpress/_query-partials/globalPostFields'
import seoPostFields from '@/lib/wordpress/_query-partials/seoPostFields'
import {gql} from '@apollo/client'

// Query: retrieve support article by specified identifier.
const querySupportArticleById = gql`
  query GET_SUPPORT_ARTICLE_BY_ID(
    $id: ID!
    $language: LanguageCodeEnum! = EN_US
    $menuLanguage: LanguageCodeFilterEnum! = EN_US
  ) {
    ${defaultPageData}
    supportArticle(id: $id, idType: SLUG) {
      ${globalPostFields}
      blocksJSON
      excerpt
      ${seoPostFields}
      translation(language: $language) {
        ${globalPostFields}
        blocksJSON
        excerpt
        ${seoPostFields}
      }
    }
  }
`

export default querySupportArticleById
