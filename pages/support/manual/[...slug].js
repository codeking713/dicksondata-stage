import Container from '@/components/atoms/Container'
import Icon from '@/components/atoms/Icon'
import LayoutNew from '@/components/common/LayoutNew'
import SectionHead from '@/components/molecules/SectionHead'
import {getLangCode} from '@/functions/checkout/commonUtil'
import getPagePropTypes from '@/functions/getPagePropTypes'
import getPostTypeStaticPaths from '@/functions/wordpress/postTypes/getPostTypeStaticPaths'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import Link from 'next/link'
import styles from './manual.module.scss'

// Define route post type.
const postType = 'supportManual'

/**
 * Render the Page component.
 *
 * @author DAP
 * @param  {object}  props      The component attributes as props.
 * @param  {object}  props.post Post data from WordPress.
 * @return {Element}            The Page component.
 */
export default function Page({post}) {
  return (
    <LayoutNew seo={{...post?.seo}}>
      <Container>
        <SectionHead
          className={styles.article__header}
          heading={post?.title}
          alignment="left"
          headingTag="h1"
        />
        <Link
          href={post?.support_manual_options?.manualFile?.mediaItemUrl ?? '#'}
        >
          <a download target="_blank" className={styles['article__link']}>
            <Icon
              title="download"
              style="line"
              icon="download"
              viewBox="0 0 512 512"
              className={styles['article__link--download']}
            />
            <span>Download {post.title}</span>
          </a>
        </Link>
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

Page.propTypes = {
  ...getPagePropTypes(postType)
}
