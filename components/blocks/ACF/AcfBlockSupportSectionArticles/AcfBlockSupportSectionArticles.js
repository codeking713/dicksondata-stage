import AcfSupportSectionArticles from '@/components/organisms/AcfSupportSectionArticles'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockSupportSectionArticles block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockSupportSectionArticles({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfSupportSectionArticles {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfSupportSectionArticles.js.'
      )}
    </>
  )
}

AcfBlockSupportSectionArticles.propTypes = {
  attributes: PropTypes.object
}
