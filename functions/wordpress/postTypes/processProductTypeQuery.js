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
export default async function processProductTypeQuery(
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
    errorMessage: null
  }

  // If no query is set for given post type, return error message.
  if (!query) {
    return {
      apolloClient,
      error: true,
      errorMessage: `Query cannot be empty`
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
      const post = postData.products.edges

      //   postData?.[postType] ?? // Dynamic posts.
      //   headlessConfig?.additionalSettings?.[postType] // Settings custom page.

      // Set error props if data not found.
      if (!post) {
        response.error = true
        response.errorCode = 400
        response.errorMessage = `An error occurred while trying to retrieve data for product "${id}."`

        return null
      }

      return post
    })
    .then(async (post) => {
      // Add slug/ID to post.

      //Pick the correct product node based on selected language
      let langSpecificPost = post.find((p) =>
        p.node.productLanguage.nodes.find(
          (l) => l.slug === variables.language.toLowerCase()
        )
      )

      //https://app.asana.com/0/1202708645319876/1202974325978019
      //If a product locale does not match with the currently selected site locale, we will show a 404 page
      if (!langSpecificPost) {
        response.error = true
        response.errorCode = 400
        response.errorMessage = `An error occurred while trying to retrieve data for product "${id}."`
        return null
      }

      //If request language or the default language is found we will load what ever is first in the list.
      //if (!langSpecificPost) langSpecificPost = post[0]

      let newPost = {...langSpecificPost.node, slug: id}

      //Check if translation exists, if so load the translation of the page, else load the regular page
      //Language Override
      // if (post?.translation) {
      //   newPost = {
      //     ...post?.translation,
      //     slug: id
      //   }
      // } else {
      //   newPost = {
      //     ...post,
      //     slug: id
      //   }
      // }

      // if ('basic' === preview || !post || !post?.blocksJSON) {
      //   return post
      // }

      // Handle blocks.
      //      newPost.blocks = await formatBlockData(
      //   JSON.parse(newPost.blocksJSON) ?? []
      // )

      // delete newPost.blocksJSON

      return newPost
    })
    .catch((error) => {
      response.error = true
      response.errorCode = 500
      response.errorMessage = error.message

      return null
    })

  return response
}
