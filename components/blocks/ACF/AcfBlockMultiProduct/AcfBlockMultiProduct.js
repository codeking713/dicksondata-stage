import AcfMultiProduct from '@/components/organisms/AcfMultiProduct'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockMultiProduct block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockMultiProduct({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfMultiProduct {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfBlockMultiProduct.js.'
      )}
    </>
  )
}

AcfBlockMultiProduct.propTypes = {
  attributes: PropTypes.object
}
