import processGlobalPagePostTypeQuery from '@/functions/wordpress/postTypes/processGlobalPagePostTypeQuery'
import queryGlobalPage from '@/lib/wordpress/pages/queryGlobalPage'
import queryGlobalProductPage from '@/lib/wordpress/pages/queryGlobalProductPage'
import queryGlobalSupportProductPage from '@/lib/wordpress/pages/queryGlobalSupportProductPage'
import headlessConfigPageQuerySeo from '@/lib/wordpress/_config/headlessConfigPageQuerySeo'

/**
 * Retrieve single page set via Headless Config.
 *
 * @author DAP
 * @param  {string} slug     Page slug
 * @param  {string} language Language
 * @return {object}          Object containing Apollo client instance and post data or error object.
 */
export default async function getGlobalPageConfig(slug, language) {
  var query = ''
  var variables = {}
  switch (slug) {
    case 'category':
    case 'support-product':
      query = queryGlobalSupportProductPage
      variables = {slug: slug, menuLanguage: language}
      break
    case 'products':
      query = queryGlobalProductPage
      variables = {slug: slug, language: language, menuLanguage: language}
      break
    case 'checkout':
    case 'cart':
    case 'order-received':
      query = queryGlobalPage
      variables = {slug: slug, language: language, menuLanguage: language}
      break
    default:
      return null
  }

  const data = await processGlobalPagePostTypeQuery(
    'page',
    slug,
    query,
    variables
  )

  // Add custom SEO if missing.
  if (!data?.post?.seo) {
    data.post = {
      ...data?.post,
      seo: {
        title: `${headlessConfigPageQuerySeo[slug]?.title ?? ''} - ${
          data.defaultSeo?.openGraph?.siteName ?? ''
        }`,
        description: headlessConfigPageQuerySeo[slug]?.description ?? '',
        canonical: `${data.defaultSeo?.openGraph?.url ?? ''}/${slug}`
      }
    }
  }

  return data
}
