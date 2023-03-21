import archiveData from '@/lib/wordpress/_query-partials/archiveData'
import defaultPageData from '@/lib/wordpress/_query-partials/defaultPageData'
import featuredImagePostFields from '@/lib/wordpress/_query-partials/featuredImagePostFields'
import globalPostFields from '@/lib/wordpress/_query-partials/globalPostFields'
import {gql} from '@apollo/client'

// Fragment: retrieve archive support fields.
const archiveSupportArticleFragment = gql`
  fragment ArchiveSupportArticleFields on ArchiveSupport {
    ${globalPostFields}
    excerpt
    ${featuredImagePostFields}
    support_article_options {
      assignedToProduct {
        ... on SimpleProduct {
          id
          name
        }
        ... on VariableProduct {
          id
          name
        }
      }
      categorizedAs
    }
  }
`

// Query: retrieve support articles archive.
const querySupportArticleArchive = gql`
  query GET_SUPPORT_ARCHIVE(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $orderBy: PostObjectsConnectionOrderbyEnum = DATE
    $order: OrderEnum = DESC
    $imageSize: MediaItemSizeEnum = THUMBNAIL
  ) {
    ${defaultPageData}
    supportArticles(
      first: $first
      last: $last
      after: $after
      before: $before
      where: {orderby: {field: $orderBy, order: $order}}
    ) {
      ${archiveData}
      edges {
        node {
          ...ArchiveSupportArticleFields
        }
      }
    }
  }
  ${archiveSupportArticleFragment}
`

export default querySupportArticleArchive
