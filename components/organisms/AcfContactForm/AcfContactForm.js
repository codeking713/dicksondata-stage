import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import Icon from '@/components/atoms/Icon'
import {Select, Text} from '@/components/atoms/Inputs'
import Form from '@/components/molecules/Form'
import ListItem from '@/components/molecules/ListItem'
import SectionHead from '@/components/molecules/SectionHead'
import {
  parseName,
  selectOptionsIndustries,
  validateEmail
} from '@/functions/services/hubspot'
import {getTranslation, returnUnformattedTel} from '@/functions/utility'
import axios from 'axios'
import cn from 'classnames'
import {useWordPressContext} from 'components/common/WordPressProvider'
import Image from 'next/image'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import styles from './AcfContactForm.module.scss'
import FRA from './icon-france.png'
import USA from './icon-usa.png'

export const acfContactFormFragment = `
  fragment AcfContactFormFragment on AcfAcfContactForm {
    acfFields {
      messageCopy
      messageHeading
      messageSubmitText
      sectionCopy
      sectionHeading
      items {
        text
        siteAddressUsa
        siteAddressFrance
        location
        icon {
          id
          altText
          mediaItemUrl
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
`

/**
 * Render the AcfContactForm component.
 *
 * @param  {object}  props                   AcfContactForm component props.
 * @param  {string}  props.messageHeading    The message heading
 * @param  {string}  props.messageCopy       The message copy
 * @param  {string}  props.messageSubmitText The message submit text
 * @param  {Array}   props.items             The items for the section.
 * @param  {boolean} props.showLocation      Show/hide location
 * @return {Element}                         The AcfContactForm component.
 */
function AcfContactForm({
  messageCopy,
  messageHeading,
  messageSubmitText,
  items,
  showLocation
}) {
  const [regionValue, setRegionValue] = useState('')
  const [questionValue, setQuestionValue] = useState('')
  const [industryValue, setIndustryValue] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const {headlessConfig} = useWordPressContext()
  const {locale} = useRouter()

  useEffect(() => {
    const name = document.getElementById('name')
    const phone = document.getElementById('phone')
    const email = document.getElementById('email')
    const region = document.getElementById('region')

    if (name) {
      name.oninvalid = function (e) {
        e.target.setCustomValidity('')
        if (!e.target.validity.valid) {
          e.target.setCustomValidity(
            getTranslation(headlessConfig, 'VALIDATION_NAME')
          )
        } else {
          e.target.setCustomValidity('')
        }
      }
    }

    if (phone) {
      phone.oninvalid = function (e) {
        e.target.setCustomValidity('')
        if (
          !e.target.validity.valid ||
          (e.target.value && e.target.value.length < 7)
        ) {
          e.target.setCustomValidity(
            getTranslation(headlessConfig, 'VALIDATION_PHONE')
          )
        } else {
          e.target.setCustomValidity('')
        }
      }
    }

    if (email) {
      email.oninvalid = function (e) {
        e.target.setCustomValidity('')
        if (!e.target.validity.valid) {
          e.target.setCustomValidity(
            getTranslation(headlessConfig, 'VALIDATION_EMAIL')
          )
        } else {
          e.target.setCustomValidity('')
        }
      }
    }

    if (region) {
      region.oninvalid = function (e) {
        e.target.setCustomValidity('')
        if (!e.target.validity.valid) {
          e.target.setCustomValidity(
            getTranslation(headlessConfig, 'VALIDATION_REGION')
          )
        }
      }
    }
  }, [headlessConfig])

  const onSubmit = (data) => {
    const parsedName = parseName(data.name)

    if (
      !data?.name ||
      !data?.phone ||
      data?.phone?.length < 7 ||
      !validateEmail(data?.email) ||
      !regionValue
    ) {
      return
    }

    // if (data?.phone?.length < 7) {
    //   setErrorMessage(getTranslation(headlessConfig, 'VALIDATION_PHONE'))
    //   return
    // }

    // if (!validateEmail(data?.email)) {
    //   setErrorMessage(getTranslation(headlessConfig, 'VALIDATION_EMAIL'))
    //   return
    // }

    const payload = {
      formType: 'Contact',
      formData: [
        {
          name: 'firstname',
          value: parsedName?.name
        },
        {
          name: 'lastname',
          value: parsedName?.secondLastName
            ? `${parsedName?.lastName} ${parsedName?.secondLastName}`
            : parsedName?.lastName
        },
        {
          name: 'industry',
          value: industryValue
        },
        {
          name: 'email',
          value: data?.email
        },
        {
          name: 'i_have_a_question_for_',
          value: questionValue
        },
        {
          name: 'region',
          value: regionValue
        }
      ],
      contextData: {
        pageName: document.title,
        pageUri: document.URL
      }
    }

    setLoading(true)
    setDisabled(true)

    axios
      .post('/api/hubspot', payload)
      .then((response) => {
        if (response.status === 'error') {
          setErrorMessage(
            getTranslation(headlessConfig, 'ERROR_SOMETHING_WENT_WRONG')
          )
          setDisabled(false)
          setLoading(false)
        } else {
          setErrorMessage(false)
          setDisabled(false)
          setLoading(false)
          setIsFormSubmitted(true)
        }
      })
      .catch(() => {
        setErrorMessage(
          getTranslation(headlessConfig, 'ERROR_SOMETHING_WENT_WRONG')
        )
        setDisabled(false)
        setLoading(false)
      })
  }

  const handleRecaptcha = (isCaptcha) => {
    setDisabled(!isCaptcha)
  }

  const selectOptions = [
    {
      text: 'Customer Service',
      label: getTranslation(headlessConfig, 'CUSTOMER_SERVICE'),
      value: 'Customer Service'
    },
    {
      text: 'Sales',
      label: getTranslation(headlessConfig, 'SALES'),
      value: 'Sales'
    },
    {
      text: 'General Inquiry',
      label: getTranslation(headlessConfig, 'GENERAL_INQUIRY'),
      value: 'General Inquiry'
    },
    {
      text: 'Service Experts',
      label: getTranslation(headlessConfig, 'SERVICE_EXPERTS'),
      value: 'Service Experts'
    }
  ]

  const countries = [
    {
      text: getTranslation(headlessConfig, 'AMERICAS_COUNTRIES'),
      value: 'americas'
    },
    {
      text: getTranslation(headlessConfig, 'EUROASIA_COUNTRIES'),
      value: 'euroasia'
    }
  ]

  const OpenChat = () => {
    window?.SnapEngage?.startLink()
  }

  const returnItemText = (item) => {
    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    }

    if (item.includes('Live Chat')) {
      return (
        <a
          className={styles.container__section__items__link}
          onClick={OpenChat}
        >
          {item}
        </a>
      )
    } else if (
      item.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im)
    ) {
      return <a href={`tel:${returnUnformattedTel(item)}`}>{item}</a>
    } else if (validateEmail(item)) {
      return <a href={`mailto:${item}`}>{item}</a>
    } else {
      return item
    }
  }

  return (
    <Container className={styles.container}>
      <div className={styles.container__formarea}>
        {isFormSubmitted ? (
          <div className={styles.container__formarea_formsubmitted}>
            <h1>
              {locale === 'fr-fr'
                ? getTranslation(
                    headlessConfig,
                    'Merci de rester en contact. Nous vous contacterons bientôt !'
                  )
                : getTranslation(
                    headlessConfig,
                    "Thank you for getting in touch. We'll reach out soon!"
                  )}
            </h1>
          </div>
        ) : (
          <>
            <SectionHead
              className={styles.container__formarea__sectionhead}
              heading={messageHeading}
              subheading={messageCopy}
              alignment="center"
            />
            <Form
              onSubmit={onSubmit}
              showSubmitButton={false}
              formDefaults={{
                name: '',
                email: '',
                phone: '',
                message: ''
              }}
              className={styles.section__formarea__form}
              id="acfContactForm"
            >
              <div>
                <Text
                  id="name"
                  className={styles.container__formarea__form__inputhalf}
                  label={getTranslation(headlessConfig, 'FULL_NAME')}
                  isRequired={true}
                  type="text"
                />
              </div>
              <div>
                <Text
                  id="phone"
                  className={styles.container__formarea__form__inputhalf}
                  label={getTranslation(headlessConfig, 'PHONE_NUMBER')}
                  isRequired={true}
                  type="tel"
                />
              </div>
              <Select
                id="industryLg"
                className={styles.section__form__twocol__inputgrp}
                label={getTranslation(headlessConfig, 'INDUSTRY')}
                isRequired={false}
                optionalLabel={getTranslation(headlessConfig, 'OPTIONAL')}
                getValue={setIndustryValue}
                options={selectOptionsIndustries.map((i) => {
                  return {...i, text: getTranslation(headlessConfig, i.text)}
                })}
              />
              <div>
                <Text
                  id="email"
                  className={styles.container__formarea__form__inputhalf}
                  label={getTranslation(headlessConfig, 'WORK_EMAIL')}
                  isRequired={true}
                  type="email"
                />
              </div>
              <Select
                id="i_have_a_question_for_"
                className={styles.container__formarea__form__select}
                label={getTranslation(headlessConfig, 'I_HAVE_A_QUESTION')}
                getValue={setQuestionValue}
                optionalLabel={getTranslation(headlessConfig, 'OPTIONAL')}
                isRequired={false}
                options={selectOptions}
              />
              <div>
                <Select
                  id="region"
                  label={getTranslation(headlessConfig, 'REGION')}
                  isRequired={true}
                  getValue={setRegionValue}
                  options={countries.map((country) => ({
                    text: country.text,
                    value: country.value
                  }))}
                />
              </div>
              <Text
                id="message"
                className={styles.container__formarea__form__textarea}
                label={getTranslation(headlessConfig, 'MESSAGE')}
                optionalLabel={getTranslation(headlessConfig, 'OPTIONAL')}
                isRequired={false}
                type="text"
              />
              <Button
                disabled={disabled}
                loading={loading}
                className={styles.container__formarea__form__submit}
                text={
                  messageSubmitText
                    ? messageSubmitText
                    : getTranslation(headlessConfig, 'SUBMIT')
                }
                isSubmit={true}
              />
              <div className={styles.container__formarea__form__checkboxes}>
                <div
                  className={
                    styles.container__formarea__form__checkboxes__optin
                  }
                >
                  <label
                    className={
                      styles.container__formarea__form__checkboxes__optin__message
                    }
                    htmlFor="contactAgreement"
                  >
                    {getTranslation(
                      headlessConfig,
                      'MESSAGE_CONTACT_AGREEMENT'
                    )}
                  </label>
                </div>
                <div
                  className={
                    styles.container__formarea__form__checkboxes__captcha
                  }
                >
                  <ReCAPTCHA
                    theme="light"
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={(e) => handleRecaptcha(e)}
                  />
                </div>
              </div>
            </Form>
          </>
        )}
        {errorMessage && (
          <div className={styles.container__error}>
            <Icon size="lg" title="info" icon="info" />{' '}
            <strong className={styles['container__error--margin']}>
              {errorMessage}
            </strong>
          </div>
        )}
      </div>
      {showLocation && (
        <div className={styles.container__section}>
          <h3>{getTranslation(headlessConfig, 'LOCATION')}</h3>
          <div className={styles.container__section__map}>
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=930%20Westwood%20Ave,%20Addison,%20IL%2060101,%20USA+(Dickson,%20Inc.)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>

          {items && (
            <div className={styles.container__section__items}>
              {items.map((item, index) =>
                item.location && item.location[0] !== 'None' ? (
                  <ListItem
                    key={index}
                    icon={item.icon}
                    listContentClassName={cn(
                      styles.container__section__items__listItem,
                      styles['container__section__items__listItem--country']
                    )}
                    title={
                      item?.site &&
                      item?.site?.map((loc, index) => (
                        <div key={index}>
                          {loc.usa && (
                            <>
                              <div>
                                <Image src={USA} alt="france" />
                                <span
                                  className={
                                    styles.container__section__items__country
                                  }
                                >
                                  USA
                                </span>
                              </div>
                              <div>{loc.usa}</div>
                            </>
                          )}
                          {item.location.length > 1 && index != 0 && (
                            <hr
                              className={styles.container__section__items__line}
                            />
                          )}
                          {loc.france && (
                            <>
                              <div>
                                <Image src={FRA} alt="france" />
                                <span
                                  className={
                                    styles.container__section__items__country
                                  }
                                >
                                  France
                                </span>
                              </div>
                              <div>{loc.france}</div>
                            </>
                          )}
                        </div>
                      ))
                    }
                    iconStyle={2}
                    iconPosition="left"
                    titleSize="medium"
                    className={styles.container__section__items__listitem}
                  />
                ) : (
                  <ListItem
                    key={index}
                    listContentClassName={cn(
                      styles.container__section__items__listItem,
                      styles['container__section__items__listItem--info']
                    )}
                    icon={item.icon}
                    title={returnItemText(item.text)}
                    iconStyle={2}
                    iconPosition="left"
                    titleSize="medium"
                    className={styles.container__section__items__listitem}
                  />
                )
              )}
            </div>
          )}
        </div>
      )}
    </Container>
  )
}

AcfContactForm.defaultProps = {
  showLocation: true
}

AcfContactForm.propTypes = {
  sectionHeading: PropTypes.string,
  sectionCopy: PropTypes.string,
  messageHeading: PropTypes.string,
  messageCopy: PropTypes.string,
  messageSubmitText: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.shape({
        altText: PropTypes.string,
        mediaItemUrl: PropTypes.string,
        mediaDetails: PropTypes.shape({
          height: PropTypes.number,
          sizes: PropTypes.array,
          width: PropTypes.number
        })
      })
    })
  ),
  showLocation: PropTypes.bool
}

export default AcfContactForm
