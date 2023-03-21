import Container from '@/components/atoms/Container'
import LayoutNew from '@/components/common/LayoutNew'
import PageNotifications from '@/components/molecules/PageNotifications'
import OrderReceivedComponent from '@/components/organisms/OrderReceived'
import {
  getLangCode,
  languageRestrictsPerchase
} from '@/functions/checkout/commonUtil'
import {getTranslation} from '@/functions/utility'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import {useWordPressContext} from 'components/common/WordPressProvider'
import {useRouter} from 'next/router'
import React from 'react'

const postType = 'globalpageconfig'
/**
 * Render the OrderReceived Page component.
 *
 * @author DAP
 * @param  {object}  props      The component attributes as props.
 * @param  {object}  props.post Post data from WordPress.
 * @return {Element}            The OrderReceived Page component.
 */
export default function OrderReceived({post}) {
  const {locale, defaultLocale} = useRouter()
  const {headlessConfig} = useWordPressContext()
  if (languageRestrictsPerchase(defaultLocale, locale)) {
    return (
      <LayoutNew seo={{...post?.seo}}>
        <Container>
          <PageNotifications
            message={getTranslation(headlessConfig, 'CHECKOUT_NOT_ALLOWED')}
            type="ERROR"
            open={true}
          />
        </Container>
      </LayoutNew>
    )
  }

  return (
    <LayoutNew seo={{...post?.seo}}>
      <OrderReceivedComponent />
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
  const postData = await getPostTypeStaticProps(
    {slug: 'order-received'},
    postType,
    false,
    null,
    getLangCode(locale)
  )

  return {
    props: {
      ...postData?.props,
      post: postData?.props?.post || {}
    },
    revalidate: Number(process.env.NEXT_STATIC_PROPS_REVALIDATE)
  }
}
