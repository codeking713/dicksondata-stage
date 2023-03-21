import formatHierarchicalBlockData from '@/functions/wordpress/blocks/formatHierarchicalBlockData'
import getGfFormById from '@/functions/wordpress/gravityForms/getGfFormById'
import getMediaByID from '@/functions/wordpress/media/getMediaByID'
import getProductByID from './products/getProductByID'

/**
 * Format and retrieve expanded block data.
 *
 * @author DAP
 * @param  {Array} blocks Basic block data.
 * @return {Array}        Formatted block data.
 */
export default async function formatBlockData(blocks) {
  if (!blocks || !blocks.length) {
    return []
  }
  return await Promise.all(
    blocks.map(async (block) => {
      const {name, attributes, innerBlocks} = block

      switch (name) {
        case 'acf/acf-multi-product': {
          const products = []
          const ids = attributes?.data?.products
          // get products
          for (let i = 0; i < ids.length; i++) {
            products.push(await getProductByID(attributes?.data?.products[i]))
          }
          attributes.data.products = products
          break
        }

        case 'acf/acf-product-matrix':
          attributes.data.products = formatHierarchicalBlockData(
            attributes.data
          )

          for (const product of attributes.data.products) {
            if (product.image)
              product.imageMeta = await getMediaByID(product.image)
          }
          break

        case 'gravityforms/form':
          // Retrieve form data.
          attributes.formData = await getGfFormById(attributes?.formId)
          break

        case 'acf/acf-stats-section':
          attributes.data.stats = formatHierarchicalBlockData(attributes.data)
          break

        case 'acf/acf-quotes':
          attributes.data.items = formatHierarchicalBlockData(attributes.data)
          break

        case 'acf/acf-support-section-articles':
          attributes.data.items = formatHierarchicalBlockData(attributes.data)
          break

        case 'acf/acf-support-accordion-list':
          attributes.data.items = formatHierarchicalBlockData(attributes.data)
          break

        case 'core/image':
          // Retrieve additional image meta.
          attributes.imageMeta = await getMediaByID(attributes?.id)
          break
      }

      const innerBlocksFormatted = await formatBlockData(innerBlocks)

      return {name, attributes, innerBlocks: innerBlocksFormatted}
    })
  )
}
