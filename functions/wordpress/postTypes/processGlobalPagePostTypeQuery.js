import getMenus from '@/functions/wordpress/menus/getMenus'
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
export default async function processGlobalPagePostTypeQuery(
  postType,
  id,
  query,
  variables = {},
  preview = null
) {
  //Get/create Apollo instance.
  const apolloClient = preview
    ? createWpApolloClient(true)
    : initializeWpApollo()

  //Set up return object.
  const response = {
    apolloClient,
    error: false,
    errorMessage: null
  }

  //If no query is set for given post type, return error message.
  if (!query) {
    return {
      apolloClient,
      error: true,
      errorMessage: `Post type \`${postType}\` is not supported.`
    }
  }

  //Execute query.
  await apolloClient
    .query({query, variables})
    .then((res) => {
      const {headlessConfig, ...postData} = res.data
      //Retrieve post data.
      //Language Override
      var post = null
      if (postData?.globalPageConfigBy?.translation) {
        post = postData?.globalPageConfigBy?.translation
      } else {
        post = postData?.globalPageConfigBy
      }

      //Set error props if data not found.
      if (!post) {
        response.error = true
        response.errorMessage = `An error occurred while trying to retrieve data for ${postType} "${id}."`
        return response
      } else {
        response.globalPageConfig = post.globalPageConfig
      }

      //Retrieve menus.
      response.menus = getMenus(res.data)

      //Add headless config data
      response.headlessConfig = headlessConfig

      //Retrieve default SEO data.
      response.post = {seo: post.seo}

      if (postData?.globalPageConfigBy?.translations) {
        response.translations = postData?.globalPageConfigBy?.translations
      }
    })
    .catch((error) => {
      response.error = true
      response.errorMessage = error.message
    })

  return response
}
