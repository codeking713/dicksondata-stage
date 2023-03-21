import AcfMultiColumnContent from '@/components/organisms/AcfMultiColumnContent'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockMultiColumnContent block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockMultiColumnContent({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfMultiColumnContent {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfMultiColumnContent.js.'
      )}
    </>
  )
}

AcfBlockMultiColumnContent.propTypes = {
  attributes: PropTypes.object
}
