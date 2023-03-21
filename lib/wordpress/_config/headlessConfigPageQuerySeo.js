import queryError404Page from '@/lib/wordpress/pages/queryError404Page'
import queryError500Page from '@/lib/wordpress/pages/queryError500Page'

// Define single page query based on page name.
const headlessConfigPageQuerySeo = {
  404: {
    query: queryError404Page,
    title: '404 Not Found',
    description: ''
  },
  500: {
    query: queryError500Page,
    title: 'Error',
    description: 'Something went wrong'
  }
}

export default headlessConfigPageQuerySeo
