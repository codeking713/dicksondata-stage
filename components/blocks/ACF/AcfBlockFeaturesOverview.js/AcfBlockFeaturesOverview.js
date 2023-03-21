import AcfFeaturesOverview from '@/components/organisms/AcfFeaturesOverview'
import PropTypes from 'prop-types'

/**
 * Handle the AcfFeaturesOverview block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockFeaturesOverview({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfFeaturesOverview {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfFeaturesOverview.js.'
      )}
    </>
  )
}

AcfBlockFeaturesOverview.propTypes = {
  attributes: PropTypes.object
}
