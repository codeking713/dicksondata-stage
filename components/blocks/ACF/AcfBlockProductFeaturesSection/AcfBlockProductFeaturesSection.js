import AcfProductFeaturesSection from '@/components/organisms/AcfProductFeaturesSection'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockProductFeaturesSection block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockProductFeaturesSection({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfProductFeaturesSection {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfProductFeaturesSection.js.'
      )}
    </>
  )
}

AcfBlockProductFeaturesSection.propTypes = {
  attributes: PropTypes.object
}
