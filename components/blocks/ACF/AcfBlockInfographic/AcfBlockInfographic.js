import AcfInfographic from '@/components/organisms/AcfInfographic'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockInfographic block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockInfographic({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfInfographic {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfBlockInfographic.js.'
      )}
    </>
  )
}

AcfBlockInfographic.propTypes = {
  attributes: PropTypes.object
}
