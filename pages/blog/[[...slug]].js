import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import Container from '@/components/atoms/Container'
import RichText from '@/components/atoms/RichText'
import LayoutNew from '@/components/common/LayoutNew'
import Blocks from '@/components/molecules/Blocks'
import Comments from '@/components/molecules/Comments'
import Archive from '@/components/organisms/Archive'
import {getLangCode} from '@/functions/checkout/commonUtil'
import getPagePropTypes from '@/functions/getPagePropTypes'
import getPostTypeStaticPaths from '@/functions/wordpress/postTypes/getPostTypeStaticPaths'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'

// Define route post type.
const postType = 'post'

/**
 * Render the BlogPost component.
 *
 * @author DAP
 * @param  {object}  props            The component attributes as props.
 * @param  {object}  props.post       Post data from WordPress.
 * @param  {boolean} props.archive    Whether displaying single post (false) or archive (true).
 * @param  {Array}   props.posts      Array of post data from WordPress.
 * @param  {object}  props.pagination Archive pagination data from WordPress.
 * @return {Element}                  The BlogPost component.
 */
export default function BlogPost({post, archive, posts, pagination}) {
  if (archive) {
    return (
      <LayoutNew seo={{...post?.seo}}>
        <Container>
          <Archive posts={posts} postType={postType} pagination={pagination} />
        </Container>
      </LayoutNew>
    )
  }

  return (
    <LayoutNew seo={{...post?.seo}} hasJsonLd={true}>
      <Container>
        <article className="innerWrap">
          {!!post?.seo?.breadcrumbs && (
            <Breadcrumbs breadcrumbs={post.seo.breadcrumbs} />
          )}
          <RichText tag="h1">{post?.title}</RichText>
          <Blocks blocks={post?.blocks} />
          <Comments comments={post?.comments?.edges} postId={post.databaseId} />
        </article>
      </Container>
    </LayoutNew>
  )
}

/**
 * Get post static paths.
 *
 * @author DAP
 * @return {object} Object consisting of array of paths and fallback setting.
 */
export async function getStaticPaths() {
  return await getPostTypeStaticPaths(postType)
}

/**
 * Get post static props.
 *
 * @author DAP
 * @param  {object}  context             Context for current post.
 * @param  {object}  context.params      Route parameters for current post.
 * @param  {boolean} context.preview     Whether requesting preview of post.
 * @param  {string}  context.locale      Locale
 * @param  {object}  context.previewData Post preview data.
 * @return {object}                      Post props.
 */
export async function getStaticProps({params, preview, previewData, locale}) {
  return getPostTypeStaticProps(
    params,
    postType,
    preview,
    previewData,
    getLangCode(locale)
  )
}

BlogPost.propTypes = {
  ...getPagePropTypes(postType)
}
