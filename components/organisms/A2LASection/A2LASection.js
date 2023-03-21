import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import Image from 'next/image'
import styles from './A2LASection.module.scss'
/**
 * Render the A2LASection component.
 *
 * @param  {object}  props                A2LASection props
 * @param  {string}  props.heading        Heading
 * @param  {object}  props.cta            CTA
 * @param  {object}  props.image          Image
 * @param  {string}  props.defaultCtaText Default Cta Text
 * @author DAP
 * @return {Element}                      The A2LASection component.
 */
export default function A2LASection({heading, cta, image, defaultCtaText}) {
  if (!heading && !cta && !image) return ''
  return (
    <Container className={styles.container}>
      <div className={styles.container__wrapper}>
        <h2 className={styles.container__heading}>{heading}</h2>
        {cta?.url && (
          <Button
            url={cta?.url}
            className={styles.container__button}
            text={cta?.title ? cta?.title : defaultCtaText}
          />
        )}
      </div>
      {image && image?.mediaItemUrl && (
        <div className={styles.container__image}>
          <Image
            src={image?.mediaItemUrl}
            alt={image?.altText}
            width="350"
            height="300"
          />
        </div>
      )}
    </Container>
  )
}
