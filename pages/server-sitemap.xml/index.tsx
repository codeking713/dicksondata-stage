// pages/server-sitemap-index.xml/index.tsx
import {GetServerSideProps} from 'next'
import {getServerSideSitemap} from 'next-sitemap'
// import isHierarchicalPostType from '../../functions/wordpress/postTypes/isHierarchicalPostType'
import {gql} from '@apollo/client'
import isValidPostType from '../../functions/wordpress/postTypes/isValidPostType'
import {initializeWpApollo} from '../../lib/wordpress/connector'
import {postTypes} from '../../lib/wordpress/_config/postTypes'

const groupBy = (x, f) =>
  x.reduce((a, b, i) => ((a[f(b, i, x)] ||= []).push(b), a), {})

// const groupByToMap = (x, f) =>
//   x.reduce((a, b, i, x) => {
//     const k = f(b, i, x)
//     a.get(k)?.push(b) ?? a.set(k, [b])
//     return a
//   }, new Map())

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const pages = await getPostTypePaths('page')
  const posts = await getPostTypePaths('post')
  const supportArticles = await getPostTypePaths('supportArticle')
  const supportFaqs = await getPostTypePaths('supportFaq')
  const supportManuals = await getPostTypePaths('supportManual')
  const productPaths = await getProductTypePaths()
  const categoryPaths = await getCategoryPaths()

  const paths = [].concat(
    pages,
    posts,
    supportArticles,
    supportFaqs,
    supportManuals,
    productPaths,
    categoryPaths
  ) //await getPostTypePaths('page')

  const fields = paths?.map((path) => {
    const altRef = []

    if (path.translations.length > 0) {
      if (path.lang == 'en_US') {
        altRef.push({
          href: path.uri
            .replace('/fr_fr', '/fr-fr')
            .replace('/en_gb', '/en-gb'),
          hreflang: 'x-default'
        })
      }

      altRef.push({
        href: path.uri.replace('/fr_fr', '/fr-fr').replace('/en_gb', '/en-gb'),
        hreflang: path.lang.replace('_', '-')
      })

      path.translations.forEach(function (trans) {
        const langCode = trans.lang.replace('_', '-')
        altRef.push({
          href: trans.uri
            .replace('/fr_fr', '/fr-fr')
            .replace('/en_gb', '/en-gb'),
          hreflang: langCode
        })

        if (langCode === 'en-US') {
          altRef.push({
            href: trans.uri,
            hreflang: 'x-default'
          })
        }
      })
    }
    return {
      loc: path.uri.replace('/fr_fr', '/fr-fr').replace('/en_gb', '/en-gb'),
      lastmod: new Date().toISOString(),
      alternateRefs: path.translations?.length > 0 ? altRef : []
    }
  })

  return getServerSideSitemap(ctx, fields)
}

async function getPostTypePaths(postType) {
  if (!postType || !isValidPostType(postType)) {
    return null
  }

  // Retrieve post type plural name.
  const pluralName = postTypes[postType].pluralName

  // Check if post type is hierarchical.
  // const isHierarchical = isHierarchicalPostType(postType)

  // Determine path field based on hierarchy.
  // const pathField = isHierarchical ? 'uri' : 'slug'

  // Construct query based on post type.
  const query = gql`
    query GET_SLUGS {
      ${pluralName}(first: 10000) {
        edges {
          node {
            slug
            uri
            language {
              locale
            }
            translations {
              slug
              uri
              language {
                locale
              }
            }
          }
        }
      }
    }
  `

  // Get/create Apollo instance.
  const apolloClient = initializeWpApollo()

  // Execute query.
  const posts = await apolloClient.query({query})

  // Process paths.
  const paths = !posts?.data?.[pluralName]?.edges
    ? []
    : posts.data[pluralName].edges.map((post) => {
        // Trim leading and trailing slashes then split into array on inner slashes.
        //const slug = post.node[pathField].replace(/^\/|\/$/g, '').split('/')
        const trans = post.node.translations?.map((lang) => {
          return {
            slug: lang.slug,
            uri: process.env.FRONTEND_URL + lang.uri.replace(/^\/|\/$/g, ''),
            lang: lang.language?.locale
          }
        })

        return {
          slug: post.node.slug,
          uri: process.env.FRONTEND_URL + post.node.uri.replace(/^\/|\/$/g, ''),
          lang: post.node.language?.locale,
          translations: trans
        }
      })
  // Filter out certain posts with custom routes (e.g., homepage).
  //.filter((post) => !!post.params.slug?.join('/').length)

  return paths
  // {
  //   paths,
  //   fallback: 'blocking'
  // }
}

async function getProductTypePaths() {
  const query = gql`
    query GET_PRODUCTS {
      products(first: 10000, where: {status: "publish"}) {
        edges {
          node {
            slug
            link
            sku
            productLanguage {
              edges {
                node {
                  slug
                  children {
                    nodes {
                      slug
                      uri
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  // Get/create Apollo instance.
  const apolloClient = initializeWpApollo()

  // Execute query.
  const posts = await apolloClient.query({query})

  if (!posts?.data?.products?.edges) return []

  const filteredProducts = posts.data.products.edges
    .map(({node}) => node)
    .filter((n) => n.productLanguage.edges.length > 0)

  const skuProducts = filteredProducts.filter((n) => n.sku)
  const skuNullProducts = filteredProducts.filter((n) => !n.sku)
  const groupedSkuProducts = groupBy(skuProducts, (p) => p.sku)
  // Array.from(
  //   groupByToMap(skuProducts, (p) => p.sku).values()
  // )
  const groupedSkuNullProducts = groupBy(skuNullProducts, (p) => p.slug)
  // Array.from(
  //   groupByToMap(skuNullProducts, (p) => p.slug).values()
  // )

  const groupedProducts = []

  for (const property in groupedSkuProducts) {
    groupedProducts.push(groupedSkuProducts[property])
  }

  for (const property in groupedSkuNullProducts) {
    groupedProducts.push(groupedSkuNullProducts[property])
  }

  //groupedSkuProducts.concat(groupedSkuNullProducts)

  const paths = groupedProducts.map((productGroup) => {
    if (productGroup.length > 1) {
      const parents = productGroup.map((pg) => {
        return {
          slug: pg.slug,
          uri: pg.link
            .replace(/^\/|\/$/g, '')
            .replace(process.env.WORDPRESS_URL, process.env.FRONTEND_URL),
          lang: pg.productLanguage.edges[0].node.slug,
          translations: []
        }
      })

      productGroup.forEach((pgrp) => {
        parents.forEach((parent) => {
          if (parent.lang !== pgrp.productLanguage.edges[0].node.slug) {
            parent.translations.push({
              slug: pgrp.slug,
              uri: pgrp.link
                .replace(/^\/|\/$/g, '')
                .replace(process.env.WORDPRESS_URL, process.env.FRONTEND_URL),
              lang: pgrp.productLanguage.edges[0].node.slug,
              translations: []
            })
          }
        })
      })
      return parents
    } else {
      return {
        slug: productGroup[0].slug,
        uri: productGroup[0].link
          .replace(/^\/|\/$/g, '')
          .replace(process.env.WORDPRESS_URL, process.env.FRONTEND_URL),
        lang: productGroup[0].productLanguage.edges[0].node.slug,
        translations: []
      }
    }
  })

  let formattedPaths = []

  paths.forEach(function (path) {
    if (Array.isArray(path)) {
      formattedPaths = formattedPaths.concat(path)
    } else {
      formattedPaths.push(path)
    }
  })

  return formattedPaths
}

async function getCategoryPaths() {
  const query = gql`
    query GET_CATEGORY_PATHS {
      productCategories(first: 10000) {
        nodes {
          slug
          uri
          language {
            locale
          }
          translations {
            slug
            uri
            language {
              locale
            }
          }
        }
      }
    }
  `

  // Get/create Apollo instance.
  const apolloClient = initializeWpApollo()

  // Execute query.
  const posts = await apolloClient.query({query})

  // Process paths.
  const paths = !posts?.data?.productCategories?.nodes
    ? []
    : posts.data.productCategories.nodes.map((post) => {
        // Trim leading and trailing slashes then split into array on inner slashes.
        //const slug = post.node[pathField].replace(/^\/|\/$/g, '').split('/')
        const trans = post.translations?.map((lang) => {
          return {
            slug: lang.slug,
            uri:
              process.env.FRONTEND_URL +
              lang.uri
                .replace(/^\/|\/$/g, '')
                .replace('/product-category/', '/products/'),
            lang: lang.language?.locale
          }
        })

        return {
          slug: post.slug,
          uri:
            process.env.FRONTEND_URL +
            post.uri
              .replace(/^\/|\/$/g, '')
              .replace('product-category', 'products'),
          lang: post.language?.locale,
          translations: trans
        }
      })
  // Filter out certain posts with custom routes (e.g., homepage).
  //.filter((post) => !!post.params.slug?.join('/').length)
  return paths
}
// Default export to prevent next.js errors
/**
 */
export default function Sitemap() {}
