import AcfContactForm from '@/components/organisms/AcfContactForm'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockContactForm block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockContactForm({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfContactForm {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfBlockContactForm.js.'
      )}
    </>
  )
}

AcfBlockContactForm.propTypes = {
  attributes: PropTypes.object
}
