import AcfSearchDownload from '@/components/organisms/AcfSearchDownload'
import PropTypes from 'prop-types'

/**
 * Handle the AcfSearchDownload block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockSearchDownload({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfSearchDownload {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfSearchDownload.js.'
      )}
    </>
  )
}

AcfBlockSearchDownload.propTypes = {
  attributes: PropTypes.object
}
