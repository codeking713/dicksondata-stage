import Container from '@/components/atoms/Container'
import Search from '@/components/molecules/Search'
import styles from './AcfSupportHero.module.scss'
/**
 * Render the AcfSupportHero component.
 *
 * @author DAP
 * @param  {object}  props             AcfSupportHero component props.
 * @param  {string}  props.heading     The heading Text
 * @param  {string}  props.sub_heading The sub-heading Text
 * @return {Element}                   The AcfSupportHero component.
 */
export default function AcfSupportHero({heading, sub_heading}) {
  return (
    <Container className={styles.container}>
      <h1 className={styles.container__heading}>{heading}</h1>
      <h4 className={styles.container__subheading}>{sub_heading}</h4>
      <Search />
    </Container>
  )
}
