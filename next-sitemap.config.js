// @see https://github.com/iamvishnusankar/next-sitemap
module.exports = {
  siteUrl: process.env.FRONTEND_URL || 'https://dicksondata.com/',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  alternateRefs: [
    {
      href: process.env.FRONTEND_URL,
      hreflang: 'x-default'
    },
    {
      href: process.env.FRONTEND_URL,
      hreflang: 'en-US'
    },
    {
      href: process.env.FRONTEND_URL + 'en-gb',
      hreflang: 'en-GB'
    },
    {
      href: process.env.FRONTEND_URL + 'fr-fr',
      hreflang: 'fr-FR'
    }
  ],
  transform: async (config, path) => {
    path = path.replace('/fr_fr/product/', '/fr_fr/produit/')
    const locales = ['fr-fr', 'en-gb', 'fr_fr', 'en_gb']
    const enOnlyPaths = [
      '/my-account',
      '/my-account/account-details',
      '/my-account/addresses',
      '/my-account/addresses/billing',
      '/my-account/addresses/shipping',
      '/my-account/lost-password',
      '/my-account/lost-password/Skeleton/LostPasswordSkeleton',
      '/my-account/orders',
      '/my-account/reset',
      '/my-account/reset/Skeleton/LostPasswordSkeleton',
      '/my-account/set-password',
      '/profile',
      // '/a2la',
      '/careers',
      '/privacy-policy',
      '/terms-of-sale'
    ]
    if (enOnlyPaths.indexOf(path) !== -1) {
      const enAltRefs = []

      config.alternateRefs.map((alternate) => {
        const newHref = alternate.href
          .replace('/fr_fr', '/fr-fr')
          .replace('/en_gb', '/en-gb')
        alternate.href = newHref

        if (!newHref.includes('/fr-fr') && !newHref.includes('/en-gb')) {
          enAltRefs.push(alternate)
        }
      })

      return {
        loc: path.replace('/fr_fr', '/fr-fr').replace('/en_gb', '/en-gb'),
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: enAltRefs
      }
    }
    return {
      loc: path.replace('/fr_fr', '/fr-fr').replace('/en_gb', '/en-gb'),
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs:
        config.alternateRefs.map((alternate) => {
          // Ex: try to find '/en-US/'
          const hasPathLocale = locales.indexOf(path.substring(1, 6)) !== -1
          const newHref = alternate.href
            .replace('/fr_fr', '/fr-fr')
            .replace('/en_gb', '/en-gb')
          alternate.href = newHref
          const separator = alternate.href.slice(-1) === '/' ? '' : '/'
          //  Only fix alternateRefs if path has a locale
          return hasPathLocale
            ? {
                ...alternate,
                // Note: concat original alternate with  '/en-US/my-page' => my-page
                href: `${alternate.href}${separator}${path.substring(7)}`,
                hrefIsAbsolute: true
              }
            : alternate
        }) ?? []
    }
  },
  exclude: [
    '/server-sitemap.xml',
    '/about',
    '/contact',
    '/produit/*',
    '/product/*',
    '/products/*',
    '/produits/*',
    '*/solutions',
    '*/solutions/*',
    '*/services',
    '*/services/*',
    '/support/*',
    '/product-category/*',
    '*/category/*',
    '*/cart',
    '*/checkout',
    '*/checkout/*',
    '/en-gb/my-account',
    '/en-gb/my-account/*',
    '/fr-fr/my-account',
    '/fr-fr/my-account/*',
    '/my-account/lost-password/Skeleton/LostPasswordSkeleton',
    '/my-account/reset/Skeleton/LostPasswordSkeleton',
    '*/solutions-landing-page/cold-room-refrigerator-monitoring',
    '/search',
    '/catalog',
    '/catalog-2',
    '/404-2',
    '/en_gb/homepage',
    '/fr_fr/accueil',
    '/en_gb/cold-room-refrigerator-monitoring',
    '/en_gb/research',
    '/fr_fr/recherche',
    '/en_gb/medical-devices',
    '/fr_fr/dispositifs-medicaux',
    '/en_gb/pharmaceutical',
    '/fr_fr/industrie-pharmaceutique',
    '/en_gb/hospital-healthcare',
    '/fr_fr/hopitaux-services-sante',
    '/en_gb/chamber-monitoring',
    '/fr_fr/surveillance-salles-blanches',
    '/en_gb/ambient-monitoring',
    '/fr_fr/surveillance-des-conditions-ambiantes',
    '/en_gb/vaccine-storage-monitoring',
    '/fr_fr/surveillance-des-conditions-de-stockage-des-vaccins',
    '/fr_fr/industrie-aeronautique',
    '/en_gb/manufacturing-production',
    '/fr_fr/fabrication-production',
    '/en_gb/food-beverage',
    '/fr_fr/agroalimentaire',
    '/en_gb/incubator-monitoring',
    '/fr_fr/surveillance-dincubateurs',
    '/fr_fr/surveillance-des-chambres-froides-des-refrigerateurs',
    '/cold-room-refrigerator-monitoring',
    '/a2la',
    '*/request-a-quote',
    '*/a-propos',
    '*/404'
  ], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      process.env.FRONTEND_URL + 'server-sitemap.xml' // <==== Add here
    ]
  }
}
