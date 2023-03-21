import {hierarchicalPostTypes} from '@/lib/wordpress/_config/postTypes'

/**
 * Check if post type is hierarchical.
 *
 * @author DAP
 * @param  {string}  postType WP post type.
 * @return {boolean}          Whether provided post type is hierarchical.
 */
export default function isHierarchicalPostType(postType) {
  return hierarchicalPostTypes.includes(postType)
}
