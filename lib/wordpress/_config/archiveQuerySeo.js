import queryPostsArchive from '@/lib/wordpress/posts/queryPostsArchive'
import querySupportArchive from '@/lib/wordpress/support/querySupportArchive'

// Define SEO for archives.
const archiveQuerySeo = {
  post: {
    query: queryPostsArchive,
    title: 'Blog',
    description: ''
  },
  support: {
    query: querySupportArchive,
    title: 'Support Articles',
    description: ''
  }
}

export default archiveQuerySeo
