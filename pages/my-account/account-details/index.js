import LayoutNew from '@/components/common/LayoutNew'
import ProfileAccountDetails from '@/components/organisms/ProfileAccountDetails'
import UserAccount from '@/components/organisms/UserAccount'
import {getLangCode} from '@/functions/checkout/commonUtil'
import getPagePropTypes from '@/functions/getPagePropTypes'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import React from 'react'

// Define route post type.
const postType = 'page'

/**
 * Render the Account Details component.
 *
 * @param  {object}  props      The component attributes as props.
 * @param  {object}  props.post Post data from WordPress.
 * @return {Element}            The Account Details component.
 */
export default function AccountDetails({post}) {
  return (
    <LayoutNew seo={{...post?.seo}}>
      <UserAccount>
        <ProfileAccountDetails />
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

AccountDetails.propTypes = {
  ...getPagePropTypes(postType)
}
