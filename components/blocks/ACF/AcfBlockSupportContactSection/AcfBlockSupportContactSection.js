import AcfSupportContactSection from '@/components/organisms/AcfSupportContactSection'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockSupportContactSection block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockSupportContactSection({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfSupportContactSection {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfSupportContactSection.js.'
      )}
    </>
  )
}

AcfBlockSupportContactSection.propTypes = {
  attributes: PropTypes.object
}
