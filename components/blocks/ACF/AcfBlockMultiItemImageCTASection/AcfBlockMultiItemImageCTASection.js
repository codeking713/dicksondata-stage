import AcfMultiItemImageCTASection from '@/components/organisms/AcfMultiItemImageCTASection'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockMultiItemImageCTASection block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockMultiItemImageCTASection({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfMultiItemImageCTASection {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfMultiItemImageCTASection.js.'
      )}
    </>
  )
}

AcfBlockMultiItemImageCTASection.propTypes = {
  attributes: PropTypes.object
}
