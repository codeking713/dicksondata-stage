import IconHeadphones from '@/components/icons/IconHeadphones'
import {getTranslation, returnUnformattedTel} from '@/functions/utility'
import {useWordPressContext} from 'components/common/WordPressProvider'
import PropTypes from 'prop-types'
import styles from './TalkToUs.module.scss'
/**
 * Render the TalkToUs component.
 *
 * @author DAP
 * @param  {object}  props            TalkToUs component props.
 * @param  {string}  props.phoneLabel The phone label
 * @param  {Array}   props.phones     The Array of phones
 * @return {Element}                  The TalkToUs component.
 */
export default function TalkToUs({phoneLabel, phones}) {
  const {headlessConfig} = useWordPressContext()

  return (
    <div className={styles.container}>
      <IconHeadphones />
      {phones && phones.length && (
        <p>
          {phoneLabel && <span>{`${phoneLabel}:`}</span>}
          {phones.map((phone) => (
            <a
              key={phone.id}
              href={`tel:${returnUnformattedTel(phone?.label)}`}
              title={`${getTranslation(headlessConfig, 'TEL_TO')} ${
                phone?.label
              }`}
            >
              {phone?.label}
            </a>
          ))}
        </p>
      )}
    </div>
  )
}
TalkToUs.propTypes = {
  label: PropTypes.string,
  phones: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      path: PropTypes.string
    })
  )
}
TalkToUs.defaultProps = {
  phoneLabel: 'Talk to us 24/7'
}
