import GravityForm from '@/components/molecules/GravityForm'
import PropTypes from 'prop-types'
import styles from '../Gutenberg.module.scss'

/**
 * GravityForm block.
 *
 * @author DAP
 * @param  {object}  props            The component props.
 * @param  {object}  props.attributes Component attributes.
 * @return {Element}                  The GravityForm component.
 */
export default function BlockGravityForm({attributes}) {
  return (
    <div className={`${styles.main} ${styles['main--gravityform']}`}>
      <GravityForm {...attributes} />
    </div>
  )
}

BlockGravityForm.propTypes = {
  attributes: PropTypes.object
}
