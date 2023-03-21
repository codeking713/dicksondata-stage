import displayBlock from '@/functions/wordpress/blocks/displayBlock'
import PropTypes from 'prop-types'
/**
 * Render the Blocks component.
 *
 * @author DAP
 * @param  {object}  props              The component attributes as props.
 * @param  {Array}   props.blocks       The array of blocks.
 * @param  {Array}   props.editorBlocks The array of editor blocks.
 * @return {Element}                    The Blocks component.
 */
export default function Blocks({ blocks, editorBlocks }) {
  //Some acf components does not support editor blocks, hence the regular block data needs to be used for them.
  //e.g. acf/acf-multi-product is a example. It requires querying of product information which is not supported in editorBlocks,
  //hence we need to revert to traditional way of querying data using blocks
  console.log(editorBlocks, "editorblocks")
  return (
    <>
      {
        // If there are blocks, loop over and display.
        !!editorBlocks?.length &&
        editorBlocks.map((block, index) => {
          switch (block.name) {
            case 'acf/acf-product-matrix':
            case 'acf/acf-multi-product':
            case 'core/embed':
            case 'acf/acf-support-accordion-list': {
              let regularBlock = blocks.find((a) => a.name == block.name)
              return displayBlock(regularBlock, index)
            }
            default:
              return displayBlock(block, index)
          }

          //return displayBlock(block, index)
        })
      }
    </>
  )
}

Blocks.propTypes = {
  blocks: PropTypes.array.isRequired,
  editorBlocks: PropTypes.array.isRequired
}

Blocks.defaultProps = {
  blocks: [],
  editorBlocks: []
}
