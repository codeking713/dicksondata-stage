import LayoutNew from '@/components/common/LayoutNew'
import ProfileOrder from '@/components/organisms/ProfileOrder'
import UserAccount from '@/components/organisms/UserAccount'
import getPagePropTypes from '@/functions/getPagePropTypes'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import {getLangCode} from '@/functions/checkout/commonUtil'
import React from 'react'

// Define route post type.
const postType = 'page'

/**
 * Render the Account Order Details component.
 *
 * @param  {object}  props      The component attributes as props.
 * @param  {object}  props.post Post data from WordPress.
 * @return {Element}            The Account Order Details component.
 */
export default function Order({post}) {
  return (
    <LayoutNew seo={{...post?.seo}}>
      <UserAccount>
        <ProfileOrder />
      </UserAccount>
    </LayoutNew>
  )
}

/**
 * Get post static props.
 *
 * @author DAP
 * @param  {object} context        Context for current post.
 * @param  {string} context.locale Locale
 * @return {object}                Post props.
 */
export async function getStaticProps({locale}) {
  return await getPostTypeStaticProps(
    null,
    'myAccount',
    false,
    null,
    getLangCode(locale)
  )
}

Order.propTypes = {
  ...getPagePropTypes(postType)
}
