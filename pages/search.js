import Container from '@/components/atoms/Container'
import LayoutNew from '@/components/common/LayoutNew'
import AlgoliaResults from '@/components/molecules/AlgoliaResults'
import {getLangCode} from '@/functions/checkout/commonUtil'
import getPagePropTypes from '@/functions/getPagePropTypes'
import parseQuerystring from '@/functions/parseQuerystring'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import {useRouter} from 'next/router'

// Define route post type.
const postType = 'page'

/**
 * Render the Search component.
 *
 * @author DAP
 * @param  {object}  props      The component attributes as props.
 * @param  {object}  props.post Post data from WordPress.
 * @return {Element}            The Search component.
 */
export default function Search({post}) {
  const router = useRouter()
  const path = router?.asPath // URL from router.
  const query = path.includes('s=') ? parseQuerystring(path, 's') : '' // Parse the querystring.
  const algoliaConfig = {
    query: query,
    hitsPerPage: 10
  }

  return (
    <LayoutNew seo={{...post?.seo}}>
      <Container>
        <AlgoliaResults config={algoliaConfig} isSearch={true} />
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
    null,
    'search',
    false,
    null,
    getLangCode(locale)
  )
}

Search.propTypes = {
  ...getPagePropTypes(postType)
}
