import {coreListFragment} from '@/components/blocks/Gutenberg/BlockList/BlockList'
import {coreParagraphFragment} from '@/components/blocks/Gutenberg/BlockParagraph/BlockParagraph'
import {acfContactFormFragment} from '@/components/organisms/AcfContactForm/AcfContactForm'
import {acfContentLinkGridFragment} from '@/components/organisms/AcfContentLinkGrid/AcfContentLinkGrid'
import {acfCtaBlockFragment} from '@/components/organisms/AcfCtaBlock/AcfCtaBlock'
import {acfFeaturesOverviewFragment} from '@/components/organisms/AcfFeaturesOverview/AcfFeaturesOverview'
import {acfHeroFragment} from '@/components/organisms/AcfHero/AcfHero'
import {acfImageValuePropSectionFragment} from '@/components/organisms/AcfImageValuePropSection/AcfImageValuePropSection'
import {acfInfographicFragment} from '@/components/organisms/AcfInfographic/AcfInfographic'
import {acfLeadgenFormFragment} from '@/components/organisms/AcfLeadGeneration/AcfLeadGeneration'
import {acfLogoGardenFragment} from '@/components/organisms/AcfLogoGarden/AcfLogoGarden'
import {acfMediaTextFragment} from '@/components/organisms/AcfMediaText/AcfMediaText'
import {acfMultiColumnContentFragment} from '@/components/organisms/AcfMultiColumnContent/AcfMultiColumnContent'
import {acfMultiItemImageCtaSectionFragment} from '@/components/organisms/AcfMultiItemImageCTASection/AcfMultiItemImageCTASection'
import {acfNewsletterFormFragment} from '@/components/organisms/AcfNewsletterForm/AcfNewsletterForm'
import {acfProductFeaturesSectionFragment} from '@/components/organisms/AcfProductFeaturesSection/AcfProductFeaturesSection'
import {acfQuicklinksNavFragment} from '@/components/organisms/AcfQuicklinksNav/AcfQuicklinksNav'
import {acfQuotesFragment} from '@/components/organisms/AcfQuotes/AcfQuotes'
import {acfRepeatingImageCopyColSectionFragment} from '@/components/organisms/AcfRepeatingImageCopyColSection/AcfRepeatingImageCopyColSection'
import {acfSearchDownloadFragment} from '@/components/organisms/AcfSearchDownload/AcfSearchDownload'
import {acfSolutionsGrid3ColumnSectionFragment} from '@/components/organisms/AcfSolutionsGrid3ColumnSection/AcfSolutionsGrid3ColumnSection'
import {acfSolutionsGrid4ColumnSectionFragment} from '@/components/organisms/AcfSolutionsGrid4ColumnSection/AcfSolutionsGrid4ColumnSection'
import {acfStatsSectionFragment} from '@/components/organisms/AcfStatsSection/AcfStatsSection'
import {acfStepsMediaVideoSectionFragment} from '@/components/organisms/AcfStepsMediaVideoSection/AcfStepsMediaVideoSection'
import {acfTeamMembersSectionFragment} from '@/components/organisms/AcfTeamMembersSection/AcfTeamMembersSection'
import {acfToggleSectionFragment} from '@/components/organisms/AcfToggleSection/AcfToggleSection'
import {acfTwoColumnImageFragment} from '@/components/organisms/AcfTwoColumnImage/AcfTwoColumnImage'
import {acfVideoLongformToggleSectionFragment} from '@/components/organisms/AcfVideoLongformToggleSection/AcfVideoLongformToggleSection'
import {acfViewProductSubcategoriesSectionFragment} from '@/components/organisms/AcfViewProductSubcategoriesSection/AcfViewProductSubcategoriesSection'
import {acfWhitepaperFragment} from '@/components/organisms/AcfWhitepaper/AcfWhitepaper'
import authorPostFields from '@/lib/wordpress/_query-partials/authorPostFields'
import defaultPageData from '@/lib/wordpress/_query-partials/defaultPageData'
import featuredImagePostFields from '@/lib/wordpress/_query-partials/featuredImagePostFields'
import globalPostFields from '@/lib/wordpress/_query-partials/globalPostFields'
import seoPostFields from '@/lib/wordpress/_query-partials/seoPostFields'
import {gql} from '@apollo/client'

// Fragment: retrieve single page fields.
export const singlePageFragment = gql`
  fragment SinglePageFields on Page {
    ${globalPostFields}
    blocksJSON
    editorBlocks {
      ...AcfHero
      ...AcfLogoGarden
      ...AcfImageValuePropSection
      ...AcfContentLinkGridFragment
      ...AcfContactFormFragment
      ...AcfCtaBlockFragment
      ...AcfSolutionsGrid3ColumnSectionFragment
      ...AcfTeamMembersSectionFragment
      ...AcfQuotesFragment
      ...CoreParagraphFragment
      ...CoreListFragment
      ...AcfTwoColumnImageFragment
      ...AcfFeaturesOverviewFragment
      ...AcfSolutionsGrid4ColumnSectionFragment
      ...AcfStepsMediaVideoSectionFragment
      ...AcfRepeatingImageCopyColSectionFragment
      ...AcfStatsSectionFragment
      ...AcfToggleSectionFragment
      ...AcfLeadgenFormFragment
      ...AcfNewsletterFormFragment
      ...AcfMultiColumnContentFragment
      ...AcfWhitepaperFragment
      ...AcfInfographicFragment
      ...AcfVideoLongformToggleSectionFragment
      ...AcfProductFeaturesSectionFragment
      ...AcfMultiItemImageCtaSectionFragment
      ...AcfQuicklinksNavFragment
      ...AcfViewProductSubcategoriesSectionFragment
      ...AcfSearchDownloadFragment
      ...AcfMediaTextFragment
      name
    }
    excerpt
    pageOptions {
      template
    }
    ${seoPostFields}
    ${authorPostFields}
    ${featuredImagePostFields}
  }
`

// Query: retrieve page by specified identifier.
const queryPageById = gql`
  query GET_PAGE_BY_ID(
    $id: ID!
    $idType: PageIdType = URI
    $imageSize: MediaItemSizeEnum = LARGE
    $language: LanguageCodeEnum! = EN_US
    $menuLanguage: LanguageCodeFilterEnum! = EN_US
  ) {
    ${defaultPageData}
    page(id: $id, idType: $idType) {
      translation(language: $language) {
        ...SinglePageFields
        isPostsPage
        language {
          locale
        }
      }
    }
  }
  ${singlePageFragment}
  ${acfHeroFragment}
  ${acfLogoGardenFragment}
  ${acfImageValuePropSectionFragment}
  ${acfContentLinkGridFragment}
  ${acfContactFormFragment}
  ${acfCtaBlockFragment}
  ${acfSolutionsGrid3ColumnSectionFragment}
  ${acfTeamMembersSectionFragment}
  ${acfQuotesFragment}
  ${coreParagraphFragment}
  ${coreListFragment}
  ${acfTwoColumnImageFragment}
  ${acfFeaturesOverviewFragment}
  ${acfSolutionsGrid4ColumnSectionFragment}
  ${acfStepsMediaVideoSectionFragment}
  ${acfRepeatingImageCopyColSectionFragment}
  ${acfStatsSectionFragment}
  ${acfToggleSectionFragment}
  ${acfLeadgenFormFragment}
  ${acfNewsletterFormFragment}
  ${acfMultiColumnContentFragment}
  ${acfWhitepaperFragment}
  ${acfInfographicFragment}
  ${acfVideoLongformToggleSectionFragment}
  ${acfProductFeaturesSectionFragment}
  ${acfMultiItemImageCtaSectionFragment}
  ${acfQuicklinksNavFragment}
  ${acfViewProductSubcategoriesSectionFragment}
  ${acfSearchDownloadFragment}
  ${acfMediaTextFragment}
`

export default queryPageById
