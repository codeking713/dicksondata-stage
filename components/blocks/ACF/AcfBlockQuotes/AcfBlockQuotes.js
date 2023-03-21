import ACFQuotes from '@/components/organisms/AcfQuotes'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockQuote block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function ACFBlockQuotes({attributes}) {
  return (
    <>
      {attributes ? (
        <ACFQuotes {...attributes.data} />
      ) : (
        'There was a problem with attributes in ACFQuotes.js.'
      )}
    </>
  )
}

ACFBlockQuotes.propTypes = {
  attributes: PropTypes.object
}
