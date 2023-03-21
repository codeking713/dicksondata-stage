// Define valid WP post types (singular and plural GraphQL names).
export const postTypes = {
  page: {
    pluralName: 'pages',
    route: ''
  },
  post: {
    pluralName: 'posts',
    route: 'blog'
  },
  supportArticle: {
    pluralName: 'supportArticles',
    route: 'support/article'
  },
  supportFaq: {
    pluralName: 'supportFaqs',
    route: 'support/faq'
  },
  supportManual: {
    pluralName: 'supportManuals',
    route: 'support/manual'
  }
}

// Define hierarchical post types.
export const hierarchicalPostTypes = ['page']
