import {archivePropTypes} from '@/functions/getPagePropTypes'

/**
 * Render the ProductDetail component.
 *
 * @author DAP
 * @return {Element} The ProductDetail component.
 */
export default function ProductDetail() {
  // Track all posts, including initial posts and additionally loaded pages.

  return (
    <>
      <div>Product Overview page</div>
    </>
  )
}

ProductDetail.propTypes = {
  ...archivePropTypes
}
