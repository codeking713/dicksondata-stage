import AcfStatsSection from '@/components/organisms/AcfStatsSection'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockStatsSection block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockStatsSection({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfStatsSection {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfBlockStatsSection.js.'
      )}
    </>
  )
}

AcfBlockStatsSection.propTypes = {
  attributes: PropTypes.object
}
