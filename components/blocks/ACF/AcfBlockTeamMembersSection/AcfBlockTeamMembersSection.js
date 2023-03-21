import AcfTeamMembersSection from '@/components/organisms/AcfTeamMembersSection'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockTeamMembersSection block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockTeamMembersSection({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfTeamMembersSection {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfTeamMembersSection.js.'
      )}
    </>
  )
}

AcfBlockTeamMembersSection.propTypes = {
  attributes: PropTypes.object
}
