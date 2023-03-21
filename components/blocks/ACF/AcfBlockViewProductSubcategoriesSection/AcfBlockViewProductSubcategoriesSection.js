import AcfViewProductSubcategoriesSection from '@/components/organisms/AcfViewProductSubcategoriesSection'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockViewProductSubcategoriesSection block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockViewProductSubcategoriesSection({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfViewProductSubcategoriesSection {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfViewProductSubcategoriesSection.js.'
      )}
    </>
  )
}

AcfBlockViewProductSubcategoriesSection.propTypes = {
  attributes: PropTypes.object
}
