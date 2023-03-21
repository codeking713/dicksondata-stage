import defaultPageData from '@/lib/wordpress/_query-partials/defaultPageData'
import globalPostFields from '@/lib/wordpress/_query-partials/globalPostFields'
import seoPostFields from '@/lib/wordpress/_query-partials/seoPostFields'
import {gql} from '@apollo/client'

// Query: retrieve support faq by specified identifier.
const querySupportFaqById = gql`
  query GET_SUPPORT_FAQ_BY_ID(
    $id: ID!
    $language: LanguageCodeEnum! = EN_US
    $menuLanguage: LanguageCodeFilterEnum! = EN_US
  ) {
    ${defaultPageData}
    supportFaq(id: $id, idType: SLUG) {
      ${globalPostFields}
      support_faq_options {
        faqAnswer
      }
      ${seoPostFields}
      translation(language: $language) {
        ${globalPostFields}
        support_faq_options {
          faqAnswer
        }
        ${seoPostFields}
      }
    }
  }
`

export default querySupportFaqById
