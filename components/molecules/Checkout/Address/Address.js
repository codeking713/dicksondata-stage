import React from 'react'
import styles from './Address.module.scss'

/**
 * Render the Address component.
 *
 * @param  {object}  props                  Address component props.
 * @param  {string}  props.firstName        First name
 * @param  {string}  props.lastName         Last name
 * @param  {string}  props.company          Company
 * @param  {string}  props.address1         Address line 1
 * @param  {string}  props.address2         Address line 2
 * @param  {string}  props.city             City
 * @param  {string}  props.state            State
 * @param  {string}  props.country          Country
 * @param  {string}  props.postcode         Postcode
 * @param  {string}  props.heading          Section heading
 * @param  {string}  props.addressClassName Address style override
 * @return {Element}                        The Address component.
 */
export default function Address({
  firstName,
  lastName,
  company,
  address1,
  address2,
  city,
  state,
  country,
  postcode,
  heading,
  addressClassName
}) {
  return (
    <div className={`${addressClassName} ${styles.address}`}>
      <div className={styles.address__heading}>{heading}</div>
      <div className={styles.address__lines}>
        <div>
          {firstName} {lastName}, {company}
        </div>
        <div>
          {address1} {address2} {city}, {state} {postcode}, {country}
        </div>
      </div>
    </div>
  )
}
