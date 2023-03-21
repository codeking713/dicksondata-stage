import AcfStepsMediaVideoSection from '@/components/organisms/AcfStepsMediaVideoSection'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockStepsMediaVideoSection block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockStepsMediaVideoSection({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfStepsMediaVideoSection {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfStepsMediaVideoSection.js.'
      )}
    </>
  )
}

AcfBlockStepsMediaVideoSection.propTypes = {
  attributes: PropTypes.object
}
