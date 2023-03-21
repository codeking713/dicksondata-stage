const headlessConfig = `
  headlessConfig(language: $menuLanguage) {
    additionalSettings {
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
      productRequestQuotePage {
        ... on Page {
          uri
          slug
        }
      }
    }
  }
`

export default headlessConfig
