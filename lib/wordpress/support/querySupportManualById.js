import defaultPageData from '@/lib/wordpress/_query-partials/defaultPageData'
import globalPostFields from '@/lib/wordpress/_query-partials/globalPostFields'
import seoPostFields from '@/lib/wordpress/_query-partials/seoPostFields'
import {gql} from '@apollo/client'

// Query: retrieve support manual by specified identifier.
const querySupportManualById = gql`
  query GET_SUPPORT_MANUAL_BY_ID(
    $id: ID!
    $language: LanguageCodeEnum! = EN_US
    $menuLanguage: LanguageCodeFilterEnum! = EN_US
  ) {
    ${defaultPageData}
    supportManual(id: $id, idType: SLUG) {
      ${globalPostFields}
      support_manual_options {
        manualFile {
          fileSize
          mimeType
          mediaItemUrl
        }
      }
      ${seoPostFields}
      translation(language: $language) {
        ${globalPostFields}
        support_manual_options {
          manualFile {
            fileSize
            mimeType
            mediaItemUrl
          }
        }
        ${seoPostFields}
      }
    }
  }
`

export default querySupportManualById
