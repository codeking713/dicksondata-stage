/**
 * Format default SEO data for use in `DefaultSeo` component.
 *
 * @author DAP
 * @param  {object} seoData  Fallback SEO data.
 * @param  {string} language Fallback SEO data.
 * @return {object}          Formatted SEO data.
 */
export default function formatDefaultSeoData(seoData, language) {
  const homepage = seoData?.homepageSettings?.frontPage?.seo
  const siteSeo = seoData?.siteSeo
  // temp solution to disallow GB pages from indexing
  const languagesToDisallow = ['en_gb']
  let formattedLangCode = language

  if (language && language.includes('_')) {
    formattedLangCode = language.slice(0, 2).toLowerCase() + language.slice(2)
  }

  return {
    title: homepage?.title ?? '',
    description: homepage?.metaDesc ?? '',
    noIndex: languagesToDisallow.includes(language.toLowerCase())
      ? true
      : 'index' !== homepage?.metaRobotsNoindex,
    noFollow: languagesToDisallow.includes(language.toLowerCase())
      ? true
      : 'follow' !== homepage?.metaRobotsNofollow,
    openGraph: {
      type: 'website',
      locale: formattedLangCode, //'en_US',
      url: siteSeo?.schema?.siteUrl ?? '',
      siteName: siteSeo?.schema?.siteName ?? '',
      images: [
        {
          url: siteSeo?.openGraph?.defaultImage?.sourceUrl ?? ''
        }
      ]
    },
    social: {
      facebook: siteSeo?.social?.facebook?.url ?? '',
      instagram: siteSeo?.social?.instagram?.url ?? '',
      linkedIn: siteSeo?.social?.linkedIn?.url ?? '',
      mySpace: siteSeo?.social?.mySpace?.url ?? '',
      pinterest: siteSeo?.social?.pinterest?.url ?? '',
      twitter: siteSeo?.social?.twitter?.username
        ? `https://twitter.com/${siteSeo.social.twitter.username}`
        : '',
      wikipedia: siteSeo?.social?.wikipedia?.url ?? '',
      youTube: siteSeo?.social?.youTube?.url ?? ''
    }
  }
}
