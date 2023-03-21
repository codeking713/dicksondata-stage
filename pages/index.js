import Container from '@/components/atoms/Container'
import LayoutNew from '@/components/common/LayoutNew'
import { getLangCode } from '@/functions/checkout/commonUtil'
import getPagePropTypes from '@/functions/getPagePropTypes'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import Page from './[...slug]'

// Define route post type.
const postType = 'page'

/**
 * Render the HomePage component.
 *
 * @author DAP
 * @param  {object}  props      The component attributes as props.
 * @param  {object}  props.post Post data from WordPress.
 * @return {Element}            The HomePage component.
 */
export default function HomePage({ post }) {
  const { seo, ...postData } = post

  // Display dynamic page data if homepage retrieved from WP.
  if (postData && Object.keys(postData).length > 0) {
    return <Page post={post} />
  }

  // Display static page content as fallback.
  return (
    <LayoutNew seo={{ ...seo }}>
      <Container>
        <article>
          <p>
            To display your WordPress homepage dynamically, set your homepage to
            a static page via the WP dashboard (Settings: Reading Settings).
          </p>
        </article>
      </Container>
    </LayoutNew>
  )
}

/**
 * Get post static props.
 *
 * @param  {object} context        Context for current post.
 * @param  {object} context.locale Locale in current post.
 * @return {object}                Post props.
 */
export async function getStaticProps({ locale }) {
  return await getPostTypeStaticProps(
    { slug: '/' },
    postType,
    false,
    null,
    getLangCode(locale)
  )
}
HomePage.propTypes = {
  ...getPagePropTypes(postType)
}
