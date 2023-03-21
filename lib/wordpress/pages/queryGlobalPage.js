import allMenus from '@/lib/wordpress/_query-partials/allMenus'
import headlessConfig from '@/lib/wordpress/_query-partials/headlessConfig'
import seoPostFields from '@/lib/wordpress/_query-partials/seoPostFields'
import {gql} from '@apollo/client'

export const globalPageConfigFields = `
  globalPageConfig {
    page
  }
`

const queryGlobalPage = gql`
  query GET_GLOBAL_SUPPORT_PRODUCT_PAGE($slug: String, $language: LanguageCodeEnum! = EN_US, $menuLanguage: LanguageCodeFilterEnum! = EN_US) {
    ${allMenus}
    ${headlessConfig}
    globalPageConfigBy(slug: $slug) {
      ${seoPostFields}
      ${globalPageConfigFields}
      translation(language: $language) {
        ${seoPostFields}
        ${globalPageConfigFields}
      }
    }
  }
`

export default queryGlobalPage
