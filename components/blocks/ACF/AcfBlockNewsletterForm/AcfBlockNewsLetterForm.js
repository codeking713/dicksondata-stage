import AcfNewsletterForm from '@/components/organisms/AcfNewsletterForm'
import PropTypes from 'prop-types'

/**
 * Handle the AcfNewsletterform block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockNewsletterForm({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfNewsletterForm {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfNewsletterForm.js.'
      )}
    </>
  )
}

AcfBlockNewsletterForm.propTypes = {
  attributes: PropTypes.object
}
