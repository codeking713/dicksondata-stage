import AcfRepeatingImageCopyColSection from '@/components/organisms/AcfRepeatingImageCopyColSection'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockRepeatingImageCopyColSection block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockRepeatingImageCopyColSection({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfRepeatingImageCopyColSection {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfRepeatingImageCopyColSection.js.'
      )}
    </>
  )
}

AcfBlockRepeatingImageCopyColSection.propTypes = {
  attributes: PropTypes.object
}
