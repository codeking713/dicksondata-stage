import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'
import {Fragment} from 'react'

// Import WP blocks using Next Dynamic Imports
// @see https://nextjs.org/docs/advanced-features/dynamic-import

const BlockFreeform = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockFreeform')
)
const BlockQuote = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockQuote')
)
const BlockPullQuote = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockPullQuote')
)
const BlockCode = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockCode')
)
const BlockEmbed = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockEmbed')
)
const BlockMediaText = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockMediaText')
)
const BlockButton = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockButton')
)
const BlockButtons = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockButtons')
)
const BlockColumns = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockColumns')
)
const BlockCover = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockCover')
)
const BlockHeadings = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockHeadings')
)
const BlockImage = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockImage')
)
const BlockImageGallery = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockImageGallery')
)
const BlockTable = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockTable')
)
const BlockList = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockList')
)
const BlockParagraph = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockParagraph')
)
const BlockSeparator = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockSeparator')
)
const BlockSpacer = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockSpacer')
)
const BlockGravityForm = dynamic(() =>
  import('@/components/blocks/Gutenberg/BlockGravityForm')
)
const LzbBlockMediaText = dynamic(() =>
  import('@/components/blocks/LazyBlocks/LzbBlockMediaText')
)
const LzbBlockHero = dynamic(() =>
  import('@/components/blocks/LazyBlocks/LzbBlockHero')
)
const AcfMediaText = dynamic(() =>
  import('@/components/organisms/AcfMediaText')
)
const AcfHero = dynamic(() => import('@/components/organisms/AcfHero'))
// const AcfBlockContactUs = dynamic(() =>
//   import('@/components/blocks/ACF/AcfBlockContactUs')
// )
const AcfLogoGarden = dynamic(() =>
  import('@/components/organisms/AcfLogoGarden')
)
const AcfNewsletterForm = dynamic(() =>
  import('@/components/organisms/AcfNewsletterForm')
)
const AcfCtaBlock = dynamic(() => import('@/components/organisms/AcfCtaBlock'))
const AcfTwoColumnImage = dynamic(() =>
  import('@/components/organisms/AcfTwoColumnImage')
)
const AcfInfographic = dynamic(() =>
  import('@/components/organisms/AcfInfographic')
)
const AcfBlockMultiProduct = dynamic(() =>
  import('@/components/blocks/ACF/AcfBlockMultiProduct')
)
const AcfWhitepaper = dynamic(() =>
  import('@/components/organisms/AcfWhitepaper')
)
const AcfQuotes = dynamic(() => import('@/components/organisms/AcfQuotes'))
const AcfLeadGeneration = dynamic(() =>
  import('@/components/organisms/AcfLeadGeneration')
)
const AcfStatsSection = dynamic(() =>
  import('@/components/organisms/AcfStatsSection/')
)
const AcfSolutionsGrid3ColumnSection = dynamic(() =>
  import('@/components/organisms/AcfSolutionsGrid3ColumnSection')
)
const AcfSolutionsGrid4ColumnSection = dynamic(() =>
  import('@/components/organisms/AcfSolutionsGrid4ColumnSection')
)
const AcfToggleSection = dynamic(() =>
  import('@/components/organisms/AcfToggleSection')
)
const AcfImageValuePropSection = dynamic(() =>
  import('@/components/organisms/AcfImageValuePropSection')
)
const AcfStepsMediaVideoSection = dynamic(() =>
  import('@/components/organisms/AcfStepsMediaVideoSection')
)
const AcfRepeatingImageCopyColSection = dynamic(() =>
  import('@/components/organisms/AcfRepeatingImageCopyColSection')
)
const AcfProductFeaturesSection = dynamic(() =>
  import('@/components/organisms/AcfProductFeaturesSection')
)
const AcfMultiItemImageCTASection = dynamic(() =>
  import('@/components/organisms/AcfMultiItemImageCTASection')
)
const AcfTeamMembersSection = dynamic(() =>
  import('@/components/organisms/AcfTeamMembersSection')
)
const AcfQuicklinksNav = dynamic(() =>
  import('@/components/organisms/AcfQuicklinksNav')
)
const AcfFeaturesOverview = dynamic(() =>
  import('@/components/organisms/AcfFeaturesOverview')
)
const AcfMultiColumnContent = dynamic(() =>
  import('@/components/organisms/AcfMultiColumnContent')
)
const AcfViewProductSubcategoriesSection = dynamic(() =>
  import('@/components/organisms/AcfViewProductSubcategoriesSection')
)
const AcfVideoLongformToggleSection = dynamic(() =>
  import('@/components/organisms/AcfVideoLongformToggleSection')
)
const AcfContactForm = dynamic(() =>
  import('@/components/organisms/AcfContactForm')
)
const AcfBlockSupportAccordionList = dynamic(() =>
  import('@/components/blocks/ACF/AcfBlockSupportAccordionList')
)
const AcfSearchDownload = dynamic(() =>
  import('@/components/organisms/AcfSearchDownload')
)
// const AcfBlockSupportContactSection = dynamic(() =>
//   import('@/components/blocks/ACF/AcfBlockSupportContactSection')
// )
// const AcfBlockSupportSectionArticles = dynamic(() =>
//   import('@/components/blocks/ACF/AcfBlockSupportSectionArticles')
// )
const AcfBlockProductMatrix = dynamic(() =>
  import('@/components/blocks/ACF/AcfBlockProductMatrix')
)
const AcfContentLinkGrid = dynamic(() =>
  import('@/components/organisms/AcfContentLinkGrid')
)
// const AcfBlockCareersListing = dynamic(() =>
//   import('@/components/blocks/ACF/AcfBlockCareersListing')
// )

/**
 * Decide which block component to display.
 *
 * @author DAP
 * @param  {object}  block The block data.
 * @param  {number}  index A unique key required by React.
 * @return {Element}       A block-based component.
 */
export default function displayBlock(block, index) {
  // Next line previsouly had deconstructed innerBlocks, this will likely need to be readded as it was in the line below
  // const {attributes, name, innerBlocks, acfFields} = block
  const {attributes, name, acfFields, renderedHtml, innerBlocks} = block
  const blockAttributes = {...attributes, ...acfFields, renderedHtml}
  console.warn('name: ' + name)

  switch (name) {
    case 'acf/acf-hero':
      return <AcfHero {...blockAttributes} key={index} />
    case 'acf/acf-media-text':
      return <AcfMediaText {...blockAttributes} key={index} />
    case 'acf/acf-logo-garden':
      return <AcfLogoGarden {...blockAttributes} key={index} />
    case 'acf/acf-image-value-prop-section':
      return <AcfImageValuePropSection {...blockAttributes} key={index} />
    case 'acf/acf-content-link-grid':
      return <AcfContentLinkGrid {...blockAttributes} key={index} />
    case 'acf/acf-contact-form':
      return <AcfContactForm {...blockAttributes} key={index} />
    // case 'core/paragraph':
    //   return <BlockParagraph {...blockAttributes} tag='div' key={index} />
    // case 'core/list':
    //   return <BlockList {...blockAttributes} key={index} />
    case 'acf/acf-cta-block':
      return <AcfCtaBlock {...blockAttributes} key={index} />
    case 'acf/acf-solutions-grid-3-column-section':
      return <AcfSolutionsGrid3ColumnSection {...blockAttributes} key={index} />
    case 'acf/acf-team-members-section':
      return <AcfTeamMembersSection {...blockAttributes} key={index} />
    case 'acf/acf-quotes':
      return <AcfQuotes {...blockAttributes} key={index} />
    case 'acf/acf-two-column-image':
      return <AcfTwoColumnImage {...blockAttributes} key={index} />
    case 'acf/acf-features-overview':
      return <AcfFeaturesOverview {...blockAttributes} key={index} />
    case 'acf/acf-solutions-grid-4-column-section':
      return <AcfSolutionsGrid4ColumnSection {...blockAttributes} key={index} />
    case 'acf/acf-steps-media-video-section':
      return <AcfStepsMediaVideoSection {...blockAttributes} key={index} />
    case 'acf/acf-repeating-image-copy-col-section':
      return <AcfRepeatingImageCopyColSection {...blockAttributes} key={index} />
    case 'acf/acf-stats-section':
      return <AcfStatsSection {...blockAttributes} key={index} />
    case 'acf/acf-toggle-section':
      return <AcfToggleSection {...blockAttributes} key={index} />
    case 'acf/acf-leadgen-form':
      return <AcfLeadGeneration {...blockAttributes} key={index} />
    case 'acf/acf-newsletter-form':
      return <AcfNewsletterForm {...blockAttributes} key={index} />
    case 'acf/acf-multi-column-content':
      return <AcfMultiColumnContent {...blockAttributes} key={index} />
    case 'acf/acf-whitepaper':
      return <AcfWhitepaper {...blockAttributes} key={index} />
    case 'acf/acf-infographic':
      return <AcfInfographic {...blockAttributes} key={index} />
    case 'acf/acf-video-longform-toggle-section':
      return <AcfVideoLongformToggleSection {...blockAttributes} key={index} />
    case 'acf/acf-product-features-section':
      return <AcfProductFeaturesSection {...blockAttributes} key={index} />
    case 'acf/acf-multi-item-image-cta-section':
      return <AcfMultiItemImageCTASection {...blockAttributes} key={index} />
    case 'acf/acf-quicklinks-nav':
      return <AcfQuicklinksNav {...blockAttributes} key={index} />
    case 'acf/acf-view-product-subcategories-section':
      return <AcfViewProductSubcategoriesSection {...blockAttributes} key={index} />
    case 'acf/acf-search-download':
      return <AcfSearchDownload {...blockAttributes} key={index} />
    case 'acf/acf-multi-product':
      return <AcfBlockMultiProduct attributes={attributes} key={index} />
    case 'acf/acf-product-matrix':
      return <AcfBlockProductMatrix attributes={attributes} key={index} />
    case 'core/freeform':
      return <BlockFreeform {...blockAttributes} key={index} />
    case 'core/heading':
      return <BlockHeadings {...blockAttributes} key={index} />
     case 'core/quote':
       return <BlockQuote {...blockAttributes} key={index} />
     case 'core/pullquote':
       return <BlockPullQuote {...blockAttributes} key={index} />
     case 'core/code':
     case 'core/preformatted':
       return <BlockCode {...blockAttributes} key={index} />
     case 'core/embed':
       return <BlockEmbed {...blockAttributes} key={index} />
     case 'core/media-text':
       return <BlockMediaText media={blockAttributes} innerBlocks={innerBlocks} key={index} />
     case 'core/button':
       return <BlockButton {...blockAttributes} key={index} />
     case 'core/buttons':
       return <BlockButtons options={blockAttributes} innerBlocks={innerBlocks} key={index} />
     case 'core/columns':
       return <BlockColumns columns={blockAttributes} innerBlocks={innerBlocks} key={index} />
     case 'core/cover':
       return <BlockCover media={blockAttributes} innerBlocks={innerBlocks} key={index} />
     case 'core/image':
       return <BlockImage {...blockAttributes} key={index} />
     case 'core/gallery':
       return <BlockImageGallery {...blockAttributes} key={index} />
     case 'core/table':
       return <BlockTable {...blockAttributes} key={index} />
    case 'core/list':
      return <BlockList {...blockAttributes} key={index} />
    case 'core/paragraph':
      return <BlockParagraph {...blockAttributes} key={index} />
     case 'core/separator':
       return <BlockSeparator {...blockAttributes} key={index} />
     case 'core/spacer':
       return <BlockSpacer {...blockAttributes} key={index} />
     case 'gravityforms/form':
       return <BlockGravityForm {...blockAttributes} key={index} />
     case 'lazyblock/mediatext':
       return <LzbBlockMediaText {...blockAttributes} key={index} />
     case 'lazyblock/hero':
       return <LzbBlockHero {...blockAttributes} key={index} />
    case 'acf/acf-support-accordion-list':
      return <AcfBlockSupportAccordionList attributes={attributes} {...blockAttributes} key={index} />

    default:
      return (
        <Fragment key={index}>
          <pre>{JSON.stringify(blockAttributes, null, 2)}</pre>
          <pre>{JSON.stringify(name, null, 2)}</pre>
        </Fragment>
      )
  }

  // return <pre>{JSON.stringify(blockAttributes, null, 2)}</pre>
  // prettier-ignore
  // switch (name) {
  //   case 'core/freeform':
  //     return <BlockFreeform {...blockAttributes} key={index} />
  //   case 'core/quote':
  //     return <BlockQuote {...blockAttributes} key={index} />
  //   case 'core/pullquote':
  //     return <BlockPullQuote {...blockAttributes} key={index} />
  //   case 'core/code':
  //   case 'core/preformatted':
  //     return <BlockCode {...blockAttributes} key={index} />
  //   case 'core/embed':
  //     return <BlockEmbed {...blockAttributes} key={index} />
  //   case 'core/media-text':
  //     return <BlockMediaText media={blockAttributes} innerBlocks={innerBlocks} key={index} />
  //   case 'core/button':
  //     return <BlockButton {...blockAttributes} key={index} />
  //   case 'core/buttons':
  //     return <BlockButtons options={blockAttributes} innerBlocks={innerBlocks} key={index} />
  //   case 'core/columns':
  //     return <BlockColumns columns={blockAttributes} innerBlocks={innerBlocks} key={index} />
  //   case 'core/cover':
  //     return <BlockCover media={blockAttributes} innerBlocks={innerBlocks} key={index} />
  //   case 'core/heading':
  //     return <BlockHeadings {...blockAttributes} key={index} />
  //   case 'core/image':
  //     return <BlockImage {...blockAttributes} key={index} />
  //   case 'core/gallery':
  //     return <BlockImageGallery {...blockAttributes} key={index} />
  //   case 'core/table':
  //     return <BlockTable {...blockAttributes} key={index} />
  //   case 'core/list':
  //     return <BlockList {...blockAttributes} key={index} />
  //   case 'core/paragraph':
  //     return <BlockParagraph {...blockAttributes} key={index} />
  //   case 'core/separator':
  //     return <BlockSeparator {...blockAttributes} key={index} />
  //   case 'core/spacer':
  //     return <BlockSpacer {...blockAttributes} key={index} />
  //   case 'gravityforms/form':
  //     return <BlockGravityForm {...blockAttributes} key={index} />
  //   case 'lazyblock/mediatext':
  //     return <LzbBlockMediaText {...blockAttributes} key={index} />
  //   case 'lazyblock/hero':
  //     return <LzbBlockHero {...blockAttributes} key={index} />
  //   case 'acf/acf-media-text':
  //     return <AcfBlockMediaText {...blockAttributes} key={index} />
  //   case 'acf/acf-hero':
  //     return <AcfBlockHero {...blockAttributes} key={index} />
  //   case 'acf/acf-contactus':
  //     return <AcfBlockContactUs {...blockAttributes} key={index} />
  //   case 'acf/acf-logo-garden':
  //     return <AcfBlockLogo {...blockAttributes} key={index} />
  //   case 'acf/acf-newsletter-form':
  //     return <AcfBlockNewsletterForm {...blockAttributes} key={index} />
  //   case 'acf/acf-cta-block':
  //     return <AcfBlockCtaBlock {...blockAttributes} key={index} />
  //   case 'acf/acf-two-column-image':
  //     return <AcfBlockTwoColumnImage {...blockAttributes} key={index} />
  //   case 'acf/acf-infographic':
  //     return <AcfBlockInfographic {...blockAttributes} key={index} />
  //   case 'acf/acf-multi-product':
  //     return <AcfBlockMultiProduct {...blockAttributes} key={index} />
  //   case 'acf/acf-whitepaper':
  //     return <AcfBlockWhitepaper {...blockAttributes} key={index} />
  //   case 'acf/acf-quotes':
  //     return <AcfBlockQuotes {...blockAttributes} key={index} />
  //   case 'acf/acf-leadgen-form':
  //     return <AcfBlockLeadGeneration {...blockAttributes} key={index} />
  //   case 'acf/acf-stats-section':
  //     return <AcfBlockStatsSection {...blockAttributes} key={index} />
  //   case 'acf/acf-solutions-grid-3-column-section':
  //     return <AcfBlockSolutionsGrid3ColumnSection {...blockAttributes} key={index} />
  //   case 'acf/acf-solutions-grid-4-column-section':
  //     return <AcfBlockSolutionsGrid4ColumnSection {...blockAttributes} key={index} />
  //   case 'acf/acf-toggle-section':
  //     return <AcfBlockToggleSection {...blockAttributes} key={index} />
  //   case 'acf/acf-image-value-prop-section':
  //     return <AcfBlockImageValuePropSection {...blockAttributes} key={index} />
  //   case 'acf/acf-steps-media-video-section':
  //     return <AcfStepsMediaVideoSection {...blockAttributes} key={index} />
  //   case 'acf/acf-repeating-image-copy-col-section':
  //     return <AcfBlockRepeatingImageCopyColSection {...blockAttributes} key={index} />
  //   case 'acf/acf-product-features-section':
  //     return <AcfBlockProductFeaturesSection {...blockAttributes} key={index} />
  //   case 'acf/acf-multi-item-image-cta-section':
  //     return <AcfBlockMultiItemImageCTASection {...blockAttributes} key={index} />
  //   case 'acf/acf-team-members-section':
  //     return <AcfBlockTeamMembersSection {...blockAttributes} key={index} />
  //   case 'acf/acf-features-overview':
  //     return <AcfFeaturesOverview {...blockAttributes} key={index} />
  //   case 'acf/acf-quicklinks-nav':
  //     return <AcfBlockQuicklinksNav {...blockAttributes} key={index} />
  //   case 'acf/acf-multi-column-content':
  //     return <AcfBlockMultiColumnContent {...blockAttributes} key={index} />
  //   case 'acf/acf-view-product-subcategories-section':
  //     return <AcfBlockViewProductSubcategoriesSection {...blockAttributes} key={index} />
  //   case 'acf/acf-video-longform-toggle-section':
  //     return <AcfBlockVideoLongformToggleSection {...blockAttributes} key={index} />
  //   case 'acf/acf-contact-form':
  //     return <AcfBlockContactForm {...blockAttributes} key={index} />
  //   case 'acf/acf-support-accordion-list':
  //     return <AcfBlockSupportAccordionList {...blockAttributes} key={index} />
  //   case 'acf/acf-search-download':
  //     return <AcfBlockSearchDownload {...blockAttributes} key={index} />
  //   case 'acf/acf-support-contact-section':
  //     return <AcfBlockSupportContactSection {...blockAttributes} key={index} />
  //   case 'acf/acf-support-section-articles':
  //     return <AcfBlockSupportSectionArticles {...blockAttributes} key={index} />
  //   case 'acf/acf-product-matrix':
  //     return <AcfBlockProductMatrix {...blockAttributes} key={index} />
  //   case 'acf/acf-content-link-grid':
  //     return <AcfBlockContentLinkGrid {...blockAttributes} key={index} />
  //   case 'acf/acf-careers-listing':
  //     return <AcfBlockCareersListing {...blockAttributes} key={index} />
  //   default:
  //     return <pre key={index}>{JSON.stringify(blockAttributes, null, 2)}</pre>
  // }
}

displayBlock.propTypes = {
  block: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}
