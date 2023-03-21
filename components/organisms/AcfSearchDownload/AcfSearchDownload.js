import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import RichText from '@/components/atoms/RichText'
import AlgoliaSearch from '@/components/molecules/AlgoliaSearch'
import SectionHead from '@/components/molecules/SectionHead'
import {getTranslation} from '@/functions/utility'
import {useWordPressContext} from 'components/common/WordPressProvider'
import Image from 'next/dist/client/image'
import PropTypes from 'prop-types'
import styles from './AcfSearchDownload.module.scss'
import img from './img.jpg'

export const acfSearchDownloadFragment = `
  fragment AcfSearchDownloadFragment on AcfAcfSearchDownload {
    acfFields {
      formFootnote
      formHeading
      sectionCopy
      sectionHeading
      sectionCta {
        target
        title
        url
      }
    }
  }
`

/**
 * Render the AcfSearchDownlaod component.
 *
 * @param  {object}  props                AcfSearchDownlaod component props.
 * @param  {string}  props.formHeading    Form heading
 * @param  {string}  props.formFootnote   Form heading
 * @param  {string}  props.sectionHeading Section heading
 * @param  {string}  props.sectionCopy    Section copy
 * @param  {object}  props.sectionCta     Section cta
 * @return {Element}                      The AcfSearchDownlaod component.
 */
export default function AcfSearchDownlaod(props) {
  const {headlessConfig} = useWordPressContext()
  return (
    <Container className={styles.container}>
      <div className={styles.container__form}>
        <SectionHead
          className={styles.form__sectionhead}
          alignment={'left'}
          heading={props.formHeading}
        />
        <div className={styles.form__search}>
          <AlgoliaSearch minInput={3} />
        </div>
        <RichText className={styles.form__footnote}>
          {props.formFootnote}
        </RichText>
      </div>
      <section className={styles['container--section']}>
        <div className={styles.container__section}>
          <div className={styles.section__img}>
            <Image
              src={img}
              alt={`Dickson ${getTranslation(headlessConfig, 'IMAGE')}`}
            />
          </div>
          <div className={styles.section__container}>
            <SectionHead
              className={styles.section__sectionhead}
              alignment={'left'}
              heading={props.sectionHeading}
              subheading={props.sectionCopy}
            />
            <Button
              className={styles.btn}
              text={getTranslation(headlessConfig, 'SEE_CATALOG')}
              url={props.section_cta.url}
            />
          </div>
        </div>
      </section>
    </Container>
  )
}

AcfSearchDownlaod.propTypes = {
  formHeading: PropTypes.string,
  formFootnote: PropTypes.string,
  sectionHeading: PropTypes.string,
  sectionCopy: PropTypes.string,
  sectionCta: PropTypes.object
}
