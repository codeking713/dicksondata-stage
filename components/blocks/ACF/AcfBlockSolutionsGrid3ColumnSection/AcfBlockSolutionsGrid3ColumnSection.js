import AcfSolutionsGrid3ColumnSection from '@/components/organisms/AcfSolutionsGrid3ColumnSection'
import PropTypes from 'prop-types'

/**
 * Handle the AcfBlockSolutionsGrid3ColumnSection block.
 *
 * @author DAP
 * @param  {object}  props            The props.
 * @param  {object}  props.attributes The attributes object.
 * @return {Element}                  The component.
 */
export default function AcfBlockSolutionsGrid3ColumnSection({attributes}) {
  return (
    <>
      {attributes ? (
        <AcfSolutionsGrid3ColumnSection {...attributes.data} />
      ) : (
        'There was a problem with attributes in AcfSolutionsGrid3ColumnSection.js.'
      )}
    </>
  )
}

AcfBlockSolutionsGrid3ColumnSection.propTypes = {
  attributes: PropTypes.object
}
