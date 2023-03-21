import Container from '@/components/atoms/Container'
import LayoutNew from '@/components/common/LayoutNew'
import {getLangCode} from '@/functions/checkout/commonUtil'
import getPagePropTypes from '@/functions/getPagePropTypes'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import Page from './[...slug]'

// Define route post type.
const postType = 'error404Page'

/**
 * Render the Custom404 component.
 *
 * @author DAP
 * @param  {object}  props      The component attributes as props.
 * @param  {object}  props.post Post data from WordPress.
 * @return {Element}            The Custom404 component.
 */
export default function Custom404({post}) {
  const {seo, ...postData} = post

  // Update robots SEO meta.
  seo.metaRobotsNofollow = 'noindex'
  seo.metaRobotsNoindex = 'nofollow'

  // Display dynamic page data if 404 page retrieved from WP.
  if (postData && Object.keys(postData).length > 0) {
    return <Page post={post} />
  }

  return (
    <LayoutNew seo={{...seo}}>
      <Container>
        <article>
          <h1>404 Not Found</h1>
          <p>That page could not be found!</p>
        </article>
      </Container>
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
    {slug: '404'},
    postType,
    false,
    null,
    getLangCode(locale)
  )
}

Custom404.propTypes = {
  ...getPagePropTypes(postType)
}
