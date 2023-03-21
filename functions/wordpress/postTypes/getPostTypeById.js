import isHierarchicalPostType from '@/functions/wordpress/postTypes/isHierarchicalPostType'
import processPostTypeQuery from '@/functions/wordpress/postTypes/processPostTypeQuery'
import queryPageById from '@/lib/wordpress/pages/queryPageById'
import queryPostById from '@/lib/wordpress/posts/queryPostById'
import querySupportById from '@/lib/wordpress/support/querySupportArticleById'
import querySupportFaqById from '@/lib/wordpress/support/querySupportFaqById'
import querySupportManualById from '@/lib/wordpress/support/querySupportManualById'

/**
 * Retrieve single post by specified identifier.
 *
 * @author DAP
 * @param  {string}          postType WP post type.
 * @param  {number | string} id       Post identifier.
 * @param  {string}          idType   Type of ID.
 * @param  {string}          preview  Whether query is for a regular post view (null), a preview check (basic), or full post preview (full).
 * @param  {string}          language Language
 * @return {object}                   Object containing Apollo client instance and post data or error object.
 */
export default async function getPostTypeById(
  postType,
  id,
  idType = 'SLUG',
  preview = null,
  language
) {
  // Define single post query based on post type.
  const postTypeQuery = {
    page: queryPageById,
    post: queryPostById,
    supportArticle: querySupportById,
    supportFaq: querySupportFaqById,
    supportManual: querySupportManualById
  }

  // Check if post type is hierarchical.
  const isHierarchical = isHierarchicalPostType(postType)

  // Fix default ID type for hierarchical posts.
  idType = !isHierarchical || 'SLUG' !== idType ? idType : 'URI'

  // Retrieve post type query.
  const query = postTypeQuery?.[postType] ?? null

  return processPostTypeQuery(
    postType,
    id,
    query,
    {id, idType, language, menuLanguage: language},
    preview
  )
}
