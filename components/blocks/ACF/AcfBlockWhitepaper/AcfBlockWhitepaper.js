import AcfWhitepaper from '@/components/organisms/AcfWhitepaper'
import PropTypes from 'prop-types'

/**
 * Handle the AcfWhitepaper block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockWhitepaper({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfWhitepaper {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfBlockwhitepaper.js.'
      )}
    </>
  )
}

AcfBlockWhitepaper.propTypes = {
  attributes: PropTypes.object
}
