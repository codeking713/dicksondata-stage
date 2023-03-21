import allMenus from '@/lib/wordpress/_query-partials/allMenus'
import headlessConfig from '@/lib/wordpress/_query-partials/headlessConfig'
import seoPostFields from '@/lib/wordpress/_query-partials/seoPostFields'
import {gql} from '@apollo/client'

export const globalSupportPageConfigFields = `
  id
  globalPageConfig {
    supportProduct {
      a2laSection {
        header
        cta {
          target
          title
          url
        }
        image {
          mediaItemUrl
          title
          altText
        }
      }
      contactFormSection {
        header
        subheader
      }
      faqSection {
        header
        cta {
          target
          title
          url
        }
      }
      newsLetterSection {
        signupOptInText
        subheader
        header
      }
      supportContactSection {
        copy
        header
        items {
          link
          linkType
          title
          image {
            mediaItemUrl
            altText
            title
          }
        }
        description
      }
    }
    categories {
      name
      image {
        altText
        mediaItemUrl
      }
      category {
        slug
      }
    }
  }
`
// TODO: Remove translation(language: $language) once translations issues fixed
const queryGlobalSupportProductPage = gql`
  query GET_GLOBAL_SUPPORT_PRODUCT_PAGE($slug: String, $language: LanguageCodeEnum! = EN_US, $menuLanguage: LanguageCodeFilterEnum! = EN_US) {
    ${allMenus}
    ${headlessConfig}
    globalPageConfigBy(slug: $slug) {
      ${seoPostFields}
      ${globalSupportPageConfigFields}
      translation(language: $language) {
        ${seoPostFields}
        ${globalSupportPageConfigFields}
      }
      translations {
        ${seoPostFields}
        ${globalSupportPageConfigFields}
        language {
          locale
        }
      }
    }
  }
`

export default queryGlobalSupportProductPage
