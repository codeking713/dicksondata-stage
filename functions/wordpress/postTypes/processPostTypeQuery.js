import formatBlockData from '@/functions/wordpress/blocks/formatBlockData'
import getMenus from '@/functions/wordpress/menus/getMenus'
import formatDefaultSeoData from '@/functions/wordpress/seo/formatDefaultSeoData'
import {
  createWpApolloClient,
  initializeWpApollo
} from '@/lib/wordpress/connector'

/**
 * Retrieve single post.
 *
 * @author DAP
 * @param  {string}          postType  WP post type.
 * @param  {number | string} id        Post identifier.
 * @param  {object}          query     Post retrieval query.
 * @param  {object}          variables Query variables.
 * @param  {string}          preview   Whether query is for a regular post view (null), a preview check (basic), or full post preview (full).
 * @return {object}                    Object containing Apollo client instance and post data or error object.
 */
export default async function processPostTypeQuery(
  postType,
  id,
  query,
  variables = {},
  preview = null
) {
  // Get/create Apollo instance.
  const apolloClient = preview
    ? createWpApolloClient(true)
    : initializeWpApollo()

  // Set up return object.
  const response = {
    apolloClient,
    error: false,
    errorCode: null,
    errorMessage: null
  }

  // If no query is set for given post type, return error message.
  if (!query) {
    return {
      apolloClient,
      error: true,
      errorCode: 500,
      errorMessage: `Post type \`${postType}\` is not supported.`
    }
  }
  // Execute query.
  response.post = await apolloClient
    .query({query, variables})
    .then((res) => {
      const {homepageSettings, headlessConfig, siteSeo, ...postData} = res.data

      // Retrieve menus.
      response.menus = getMenus(res.data)

      //Add headless config data
      response.headlessConfig = headlessConfig

      // Retrieve default SEO data.
      response.defaultSeo = formatDefaultSeoData(
        {homepageSettings, siteSeo},
        variables.language
      )

      // Retrieve post data.
      const post =
        postData?.[postType] ?? // Dynamic posts.
        headlessConfig?.additionalSettings?.[postType] // Settings custom page.

      // Set error props if data not found.
      if (!post) {
        response.error = true
        response.errorCode = 400
        response.errorMessage = `An error occurred while trying to retrieve data for ${postType} "${id}."`

        return null
      }

      return post
    })
    .then(async (post) => {
      // Add slug/ID to post.
      if (!post || !post.translation) {
        response.error = true
        response.errorCode = 400
        response.errorMessage = `Translation not found for ${postType} "${id}."`

        return null
      }

      let result = {
        ...post.translation,
        slug: id
      }

      if ('basic' === preview || !post || !post?.translation?.blocksJSON) {
        return post
      }

      // Handle blocks.
      result.blocks = await formatBlockData(
        JSON.parse(post?.translation.blocksJSON) ?? []
      )

      return result
    })
    .catch((error) => {
      response.error = true
      response.errorCode = 500
      response.errorMessage = error.message
      return null
    })

  return response
}
