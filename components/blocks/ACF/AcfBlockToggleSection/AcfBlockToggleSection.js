import AcfToggleSection from '@/components/organisms/AcfToggleSection'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockToggleSection block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockToggleSection({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfToggleSection {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfBlockToggleSection.js.'
      )}
    </>
  )
}

AcfBlockToggleSection.propTypes = {
  attributes: PropTypes.object
}
