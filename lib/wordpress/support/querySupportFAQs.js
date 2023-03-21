import {gql} from '@apollo/client'

// Query: retrieve support faq archive.
const querySupportFAQs = gql`
  query SupportFaqs($limit: Int, $language: LanguageCodeEnum! = EN_US) {
    supportFaqs(first: $limit) {
      edges {
        node {
          databaseId
          date
          slug
          uri
          title
          status
          support_faq_options {
            faqAnswer
          }
          translation(language: $language) {
            databaseId
            date
            slug
            uri
            title
            status
            support_faq_options {
              faqAnswer
            }
          }
        }
      }
    }
  }
`

export default querySupportFAQs
