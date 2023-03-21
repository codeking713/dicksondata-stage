import AcfCareersListing from '@/components/organisms/AcfCareersListing'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockCareersListing block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockCareersListing({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfCareersListing {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfBlockCareersListing.js.'
      )}
    </>
  )
}

AcfBlockCareersListing.propTypes = {
  attributes: PropTypes.object
}
