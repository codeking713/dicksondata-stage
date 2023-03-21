import Blocks from '@/components/molecules/Blocks'
import ButtonGroup from '@/components/molecules/ButtonGroup'
import PropTypes from 'prop-types'
import styles from '../Gutenberg.module.scss'

/**
 * Buttons Block
 *
 * The core Buttons block from Gutenberg.
 *
 * @author DAP
 * @param  {object}  props             The component properties.
 * @param  {object}  props.options     Option props object.
 * @param  {Array}   props.innerBlocks The array of inner blocks to display.
 * @return {Element}                   The Buttons component.
 */
export default function BlockButtons({options, innerBlocks}) {
  return (
    <div className={`${styles.main} ${styles['main--buttongroup']}`}>
      <ButtonGroup
        id={options?.anchor}
        orientation={options?.orientation}
        contentJustification={options?.contentJustification}
      >
        {!!innerBlocks?.length && <Blocks blocks={innerBlocks} />}
      </ButtonGroup>
    </div>
  )
}

BlockButtons.propTypes = {
  options: PropTypes.shape({
    anchor: PropTypes.string,
    contentJustification: PropTypes.string,
    orientation: PropTypes.string
  }),
  innerBlocks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      attributes: PropTypes.object
    })
  )
}

BlockButtons.defaultProps = {
  options: PropTypes.shape({
    orientation: 'horizontal',
    contentJustification: 'left'
  })
}
