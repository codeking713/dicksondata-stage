import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import Accordion from '@/components/molecules/Accordion'
import PropTypes from 'prop-types'
import {v4 as uuidv4} from 'uuid'
import styles from './FAQSection.module.scss'

/**
 * Render the FAQSection component.
 *
 * @author DAP
 * @param  {object}  props                FAQSection component props.
 * @param  {string}  props.heading        Heading
 * @param  {object}  props.cta            CTA
 * @param  {string}  props.defaultCtaText Default Cta Text
 * @param  {Array}   props.faqs           FAQs Limit.
 * @return {Element}                      The FAQSection component.
 */
export default function FAQSection({faqs, heading, cta, defaultCtaText}) {
  return (
    <div className={styles.faq}>
      <Container className={styles.faq__container}>
        <h1 className={styles.faq__container__heading}>{heading}</h1>
        <div className={styles.faq__container__wrapper}>
          {faqs?.length &&
            faqs.map((item, index) => (
              <Accordion
                key={uuidv4()}
                index={index}
                title={item?.title}
                content={item?.support_faq_options?.faqAnswer}
              />
            ))}
        </div>
        {cta?.url && (
          <Button
            className={styles.faq__container__button}
            url={cta?.url}
            text={cta?.title ? cta?.title : defaultCtaText}
          />
        )}
      </Container>
    </div>
  )
}

FAQSection.propTypes = {
  faqs: PropTypes.array,
  showCta: PropTypes.bool
}
