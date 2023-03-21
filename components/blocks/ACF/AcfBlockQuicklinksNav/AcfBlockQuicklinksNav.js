import AcfQuicklinksNav from '@/components/organisms/AcfQuicklinksNav'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockQuicklinksNav block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockQuicklinksNav({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfQuicklinksNav {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfBlockQuicklinksNav.js.'
      )}
    </>
  )
}

AcfBlockQuicklinksNav.propTypes = {
  attributes: PropTypes.object
}
