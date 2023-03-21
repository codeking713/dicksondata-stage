import isHierarchicalPostType from '@/functions/wordpress/postTypes/isHierarchicalPostType'
import isValidPostType from '@/functions/wordpress/postTypes/isValidPostType'
import PropTypes from 'prop-types'

// Yoast SEO social prop types.
export const seoSocialPropTypes = {
  social: PropTypes.shape({
    facebook: PropTypes.string,
    instagram: PropTypes.string,
    linkedIn: PropTypes.string,
    mySpace: PropTypes.string,
    pinterest: PropTypes.string,
    twitter: PropTypes.string,
    wikipedia: PropTypes.string,
    youTube: PropTypes.string
  })
}

// Yoast SEO prop types.
export const seoPropTypes = {
  seo: PropTypes.shape({
    breadcrumbs: PropTypes.array,
    canonical: PropTypes.string,
    description: PropTypes.string,
    metaRobotsIndex: PropTypes.string,
    metaRobotsFollow: PropTypes.string,
    opengraphAuthor: PropTypes.string,
    opengraphModifiedTime: PropTypes.string,
    opengraphPublishedTime: PropTypes.string,
    opengraphImage: PropTypes.shape({
      altText: PropTypes.string,
      sourceUrl: PropTypes.string
    }),
    siteTitle: PropTypes.string,
    siteDescription: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    ...seoSocialPropTypes
  })
}

// Basic post prop types.
export const postPropTypes = {
  post: PropTypes.shape({
    author: PropTypes.object,
    blocks: PropTypes.array,
    databaseId: PropTypes.number,
    date: PropTypes.string,
    excerpt: PropTypes.string,
    featuredImage: PropTypes.object,
    ...seoPropTypes,
    slug: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    uri: PropTypes.string
  })
}

// Basic post archive prop types.
export const archivePropTypes = {
  archive: PropTypes.bool,
  posts: PropTypes.array,
  pagination: PropTypes.shape({
    endCursor: PropTypes.string,
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool,
    startCursor: PropTypes.string
  })
}

// Basic post archive prop types.
export const productArchivePropTypes = {
  archive: PropTypes.bool,
  posts: PropTypes.array,
  pagination: PropTypes.shape({
    endCursor: PropTypes.string,
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool,
    startCursor: PropTypes.string
  })
}

export const productDetailsPropTypes = {
  product: PropTypes.shape({
    attributes: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          attributeId: PropTypes.number,
          id: PropTypes.string,
          label: PropTypes.string,
          name: PropTypes.string,
          options: PropTypes.array,
          position: PropTypes.number,
          scope: PropTypes.oneOf(['LOCAL', 'GLOBAL']),
          variation: PropTypes.boolean,
          visible: PropTypes.boolean
        })
      )
    }),
    crossSell: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          image: PropTypes.shape({
            srcSet: PropTypes.string
          }),
          sku: PropTypes.string
        })
      )
    }),
    databaseId: PropTypes.number.isRequired,
    description: PropTypes.string,
    galleryImages: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          altText: PropTypes.string,
          databaseId: PropTypes.number.isRequired,
          mediaItemUrl: PropTypes.string
        })
      )
    }),
    image: PropTypes.shape({
      altText: PropTypes.string,
      databaseId: PropTypes.number.isRequired,
      sourceUrl: PropTypes.string,
      srcSet: PropTypes.string
    }),
    name: PropTypes.string,
    price: PropTypes.string,
    productId: PropTypes.number,
    purchasable: PropTypes.bool,
    regularPrice: PropTypes.string,
    slug: PropTypes.string,
    type: PropTypes.oneOf(['SIMPLE', 'VARIABLE', 'COMPOSITE', 'BUNDLE'])
  })
}

/**
 * Retrieve basic prop types for a given page.
 *
 * @author DAP
 * @param  {string} postType WP post type.
 * @return {object}          Page prop types.
 */
export default function getPagePropTypes(postType) {
  // Check if post type is valid.
  if (!isValidPostType(postType)) {
    return null
  }

  const hasArchive = !isHierarchicalPostType(postType)

  return {
    ...postPropTypes,
    ...(hasArchive && archivePropTypes)
  }
}
