import Container from '@/components/atoms/Container'
import SectionHead from '@/components/molecules/SectionHead'
import PropTypes from 'prop-types'
import React from 'react'
import RichText from '@/components/atoms/RichText'
import styles from './AcfCareersListing.module.scss'

/**
 * Render the AcfCareersListing component.
 *
 * @param  {object}  props                 AcfCareersListing component props.
 * @param  {string}  props.heading         The section heading
 * @param  {string}  props.copy            The section copy
 * @param  {string}  props.highlights_copy The message heading
 * @return {Element}                       The AcfCareersListing component.
 */
export default function AcfCareersListing({heading, copy, highlights_copy}) {
  return (
    <Container className={styles.container}>
      <div className={styles.container__copy}>
        <SectionHead
          className={styles.container__copy__sectionhead}
          heading={heading}
          subheading={copy}
          alignment="left"
        />
        {highlights_copy && (
          <RichText className={styles.container__copy__highlights}>
            {highlights_copy}
          </RichText>
        )}
      </div>
      <div className={styles.container__listing}>
        <iframe
          name="resumator-job-frame"
          id="resumator-job-frame"
          className={styles.container__listing__iframe}
          src="//dickson.applytojob.com/apply/jobs/"
          width="100%"
          height="100%"
          frameBorder="0"
          allowtransparency="true"
          scrolling="auto"
        ></iframe>
      </div>
    </Container>
  )
}

AcfCareersListing.propTypes = {
  heading: PropTypes.string,
  copy: PropTypes.string,
  highlights_copy: PropTypes.string
}
