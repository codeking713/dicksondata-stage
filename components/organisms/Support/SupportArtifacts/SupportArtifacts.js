import Icon from '@/components/atoms/Icon'
import {getTranslation} from '@/functions/utility'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from './SupportArtifacts.module.scss'
/**
 * Render the SupportArtifacts component.
 *
 * @author DAP
 * @param  {object}   props                     SupportArtifacts component props.
 * @param  {Function} props.articleClickHandler Handle article click
 * @param  {object}   props.product             The product object
 * @param  {object}   props.headlessConfig      Headless config data
 * @return {Element}                            The SupportArtifacts component.
 */
export default function SupportArtifacts({
  product,
  articleClickHandler,
  headlessConfig
}) {
  var articles = product?.supportProductLink?.supportArtifacts?.filter(
    (a) => a.contentTypeName === 'support_articles'
  )
  var manuals = product?.supportProductLink?.supportArtifacts?.filter(
    (a) => a.contentTypeName === 'support_manuals'
  )
  return (
    <div className={styles.artifacts}>
      {articles?.length > 0 && (
        <div className={styles.artifacts__section}>
          <div className={styles.artifacts__section__heading}>
            {getTranslation(headlessConfig, 'ARTICLES')}
          </div>
          <ul className={styles.artifacts__section__content}>
            {articles.map((article, index) => (
              <li
                onClick={() => articleClickHandler(index)}
                className={styles.artifacts__section__content__item}
                key={index}
              >
                {article.title}
              </li>
            ))}
          </ul>
        </div>
      )}
      {manuals?.length > 0 && (
        <div
          className={`${styles.artifacts__section} ${styles.artifacts__section__manuals}`}
        >
          <div className={styles.artifacts__section__heading}>
            {getTranslation(headlessConfig, 'MANUALS')}
          </div>
          <ul className={styles.artifacts__section__content}>
            {manuals.map((article, index) => (
              <li
                key={index}
                className={styles.artifacts__section__content__item}
              >
                {article?.support_manual_options?.manualFile?.link ? (
                  <Link
                    href={
                      article?.support_manual_options?.manualFile?.link ?? '#'
                    }
                  >
                    <a
                      download
                      target="_blank"
                      className={styles.artifacts__section__content__link}
                    >
                      <Icon
                        title="download"
                        style="line"
                        icon="download"
                        viewBox="0 0 512 512"
                        className={styles['bullet__icon--arrow']}
                      />
                      <span>{article.title}</span>
                    </a>
                  </Link>
                ) : (
                  <span>{article.title}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

SupportArtifacts.propTypes = {
  heading: PropTypes.string,
  sub_heading: PropTypes.string
}
