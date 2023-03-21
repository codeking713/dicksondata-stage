import AcfLeadGeneration from '@/components/organisms/AcfLeadGeneration'
import PropTypes from 'prop-types'

/**
 * Handle the AcfLeadGeneration block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockLeadGeneration({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfLeadGeneration {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfBlockLeadGeneration.js.'
      )}
    </>
  )
}

AcfBlockLeadGeneration.propTypes = {
  attributes: PropTypes.object
}
