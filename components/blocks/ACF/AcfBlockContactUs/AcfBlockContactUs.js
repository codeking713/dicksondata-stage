import AcfContactUs from '@/components/organisms/AcfContactUs'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockContactUs block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockContactUs({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfContactUs {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfBlockContactUs.js.'
      )}
    </>
  )
}

AcfBlockContactUs.propTypes = {
  attributes: PropTypes.object
}
