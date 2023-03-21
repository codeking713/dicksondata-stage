import AcfVideoLongformToggleSection from '@/components/organisms/AcfVideoLongformToggleSection'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockVideoLongformToggleSection block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockVideoLongformToggleSection({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfVideoLongformToggleSection {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfVideoLongformToggleSection.js.'
      )}
    </>
  )
}

AcfBlockVideoLongformToggleSection.propTypes = {
  attributes: PropTypes.object
}
