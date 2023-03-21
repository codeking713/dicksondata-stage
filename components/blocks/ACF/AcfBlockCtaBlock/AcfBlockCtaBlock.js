import AcfCtaBlock from '@/components/organisms/AcfCtaBlock'
import PropTypes from 'prop-types'

/**
 * Handle the AcfCtaBlock block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockCtaBlock({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfCtaBlock {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfCtaBlock.js.'
      )}
    </>
  )
}

AcfCtaBlock.propTypes = {
  attributes: PropTypes.object
}
