import AcfSupportAccordionList from '@/components/organisms/AcfSupportAccordionList'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockSupportAccordionList block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockSupportAccordionList({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfSupportAccordionList {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfBlockSupportAccordionList.js.'
      )}
    </>
  )
}

AcfBlockSupportAccordionList.propTypes = {
  attributes: PropTypes.object
}
