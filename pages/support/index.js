import LayoutNew from '@/components/common/LayoutNew'
import A2LASection from '@/components/organisms/A2LASection'
import AcfContactForm from '@/components/organisms/AcfContactForm'
import AcfNewsletterForm from '@/components/organisms/AcfNewsletterForm'
import AcfSupportContactSection from '@/components/organisms/AcfSupportContactSection'
import FAQSection from '@/components/organisms/FAQSection'
import ProductCategoryGrid from '@/components/organisms/ProductCategoryGrid/'
import SupportHero from '@/components/organisms/Support/SupportHero'
import {getLangCode} from '@/functions/checkout/commonUtil'
import getPagePropTypes from '@/functions/getPagePropTypes'
import {getTranslation} from '@/functions/utility'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import client from '@/lib/next-api/connectorWoo'
import querySupportFAQs from '@/lib/wordpress/support/querySupportFAQs'
import {useWordPressContext} from 'components/common/WordPressProvider'
import {useRouter} from 'next/router'

// Define route post type.
const postType = 'globalpageconfig'

/**
 * Render the SupportPage component.
 *
 * @author DAP
 * @param  {object}  props            The component attributes as props.
 * @param  {object}  props.faqData    FAQs data from WordPress
 * @param  {object}  props.pageConfig The page configuration data from WordPress
 * @param  {object}  props.post       Post data from WordPress.
 * @return {Element}                  The SupportPage component.
 */
export default function SupportPage({post, faqData, pageConfig}) {
  const {headlessConfig} = useWordPressContext()
  const router = useRouter()

  const openCategory = (slug) => {
    router.push(`/category/${slug}`)
  }

  return (
    <LayoutNew seo={{...post?.seo}}>
      <SupportHero
        heading={getTranslation(headlessConfig, 'SUPPORT')}
        sub_heading={getTranslation(headlessConfig, 'SUPPORT_INTRO')}
        language={getLangCode(router.locale)}
      />
      <ProductCategoryGrid
        header={getTranslation(headlessConfig, 'SELECT_CATEGORY')}
        items={pageConfig?.categories}
        itemOnClick={openCategory}
        skeletonTileCount={8}
        type="CATEGORY"
      />

      {faqData && faqData.length > 0 && (
        <FAQSection
          showCta={true}
          heading={getTranslation(headlessConfig, 'TOP_FAQS')}
          faqs={faqData.map((item) => {
            return item.node
          })}
          cta={pageConfig?.supportProduct?.faqSection?.cta}
          defaultCtaText={getTranslation(headlessConfig, 'READ_MORE')}
        />
      )}
      <AcfSupportContactSection
        heading={pageConfig?.supportProduct?.supportContactSection?.header}
        copy={pageConfig?.supportProduct?.supportContactSection?.copy}
        items={pageConfig?.supportProduct?.supportContactSection?.items.map(
          (item) => {
            return {
              link: item.link,
              linkType: item.linkType,
              title: item.title,
              imageMeta: {
                altText: item.image?.altText,
                mediaItemUrl: item.image?.mediaItemUrl
              }
            }
          }
        )}
      />
      <A2LASection
        heading={pageConfig?.supportProduct?.a2laSection?.header}
        cta={pageConfig?.supportProduct?.a2laSection?.cta}
        image={pageConfig?.supportProduct?.a2laSection?.image}
        defaultCtaText={getTranslation(headlessConfig, 'SEE_A2_DOC')}
      />
      <AcfContactForm
        message_heading={pageConfig?.supportProduct?.contactFormSection?.header}
        message_copy={pageConfig?.supportProduct?.contactFormSection?.subheader}
        message_submit_text={getTranslation(headlessConfig, 'SUBMIT')}
        showLocation={false}
      />
      <AcfNewsletterForm
        sectionCopy={pageConfig?.supportProduct?.newsLetterSection?.subheader}
        sectionHeading={pageConfig?.supportProduct?.newsLetterSection?.header}
        signupOptInText={
          pageConfig?.supportProduct?.newsLetterSection?.signupOptInText
        }
      />
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
  let postData = await getPostTypeStaticProps(
    {slug: 'support-product'},
    postType,
    false,
    null,
    getLangCode(locale)
  )
  let faqData = await client.query({
    query: querySupportFAQs,
    variables: {limit: 4, language: getLangCode(locale)}
  })
  const pageConfig = postData?.props?.globalPageConfig

  //Override the FAQ's with Translated FAQ's
  const faqs = faqData?.data?.supportFaqs?.edges?.map((f) => {
    if (f.translation) return {...f.translation}
    else return {...f}
  })

  return {
    props: {
      faqData: faqs || {},
      ...postData?.props,
      pageConfig: pageConfig || {}
    },
    revalidate: Number(process.env.NEXT_STATIC_PROPS_REVALIDATE)
  }
}

SupportPage.propTypes = {
  ...getPagePropTypes(postType)
}
