import AcfProductMatrix from '@/components/organisms/AcfProductMatrix'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockProductMatrix block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockProductMatrix({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfProductMatrix {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfProductMatrix.js.'
      )}
    </>
  )
}

AcfBlockProductMatrix.propTypes = {
  attributes: PropTypes.object
}
