import {gql} from '@apollo/client'

// Query: retrieve support articles archive.
const querySupportFAQsByCategory = gql`
  query SupportFaqs($limit: Int, $slug: [String]) {
    supportFaqs(
      first: $limit
      where: {
        taxQuery: {
          taxArray: {
            field: SLUG
            operator: IN
            taxonomy: PRODUCTCATEGORY
            terms: $slug
          }
        }
      }
    ) {
      edges {
        node {
          title
          support_faq_options {
            faqAnswer
          }
          title
        }
      }
    }
  }
`

export default querySupportFAQsByCategory
