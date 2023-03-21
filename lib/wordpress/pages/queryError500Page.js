import allMenus from '@/lib/wordpress/_query-partials/allMenus'
import defaultSeoFields from '@/lib/wordpress/_query-partials/defaultSeoFields'
import {gql} from '@apollo/client'
import {singlePageFragment} from './queryPageById'

// Query: retrieve 500 error page.
const queryError500Page = gql`
  query GET_ERROR_500_PAGE($imageSize: MediaItemSizeEnum = LARGE, $menuLanguage: LanguageCodeFilterEnum! = EN_US) {
    ${defaultSeoFields}
    ${allMenus}
    headlessConfig(language: $menuLanguage) {
      additionalSettings {
        error500Page {
          ... on Page {
            ...SinglePageFields
          }
        }
        contactInfo {
          hotline
          locations {
            addressLine1
            addressLine2
            country
            tel
            email
          }
        }
        translations {
          key
          value
        }
      }
    }
  }
  ${singlePageFragment}
`

export default queryError500Page
