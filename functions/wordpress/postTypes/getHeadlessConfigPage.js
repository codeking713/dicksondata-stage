import processPostTypeQuery from '@/functions/wordpress/postTypes/processPostTypeQuery'
import headlessConfigPageQuerySeo from '@/lib/wordpress/_config/headlessConfigPageQuerySeo'

/**
 * Retrieve single page set via Headless Config.
 *
 * @author DAP
 * @param  {string} postType Post type
 * @param  {string} slug     Slug
 * @param  {string} language Language
 * @return {object}          Object containing Apollo client instance and post data or error object.
 */
export default async function getHeadlessConfigPage(postType, slug, language) {
  // Retrieve page query.
  const query = headlessConfigPageQuerySeo?.[slug]?.query ?? null
  const data = await processPostTypeQuery(postType, slug, query, {
    language: language,
    menuLanguage: language
  })
  // Add custom SEO if missing.
  if (!data?.post?.seo) {
    data.post = {
      ...data?.post,
      seo: {
        title: `${headlessConfigPageQuerySeo[slug]?.title ?? ''} - ${
          data.defaultSeo?.openGraph?.siteName ?? 'Dickson'
        }`,
        description: headlessConfigPageQuerySeo[slug]?.description ?? '',
        canonical: `${data.defaultSeo?.openGraph?.url ?? ''}/${slug}`
      }
    }
  }

  return data
}
