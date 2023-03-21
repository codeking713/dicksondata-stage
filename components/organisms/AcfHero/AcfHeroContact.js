import Button from '@/components/atoms/Button'
import {Select, Text} from '@/components/atoms/Inputs'
import Form from '@/components/molecules/Form'
import {
  parseName,
  selectOptionsIndustries,
  selectOptionsInquiries,
  validateEmail
} from '@/functions/services/hubspot'
import {getTranslation} from '@/functions/utility'
import axios from 'axios'
import {useWordPressContext} from 'components/common/WordPressProvider'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'
import styles from './AcfHero.module.scss'

/**
 * Render the AcfHeroContact component.
 *
 * @param  {object}  props                AcfHeroContact component props.
 * @param  {string}  props.formHeading    The header.
 * @param  {string}  props.formSubheading The header.
 * @return {Element}                      The AcfHeroContact component.
 */
export default function AcfHeroContact({formHeading, formSubheading}) {
  const [industryValue, setIndustryValue] = useState('')
  const [inquiryValue, setInquiryValue] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const {headlessConfig} = useWordPressContext()
  const {locale} = useRouter()

  useEffect(() => {
    const nameHu = document.getElementById('nameHu')
    const phoneHu = document.getElementById('phoneHu')
    const emailHu = document.getElementById('emailHu')

    if (nameHu) {
      nameHu.oninvalid = function (e) {
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

    if (phoneHu) {
      phoneHu.oninvalid = function (e) {
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

    if (emailHu) {
      emailHu.oninvalid = function (e) {
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
  }, [headlessConfig])

  const onSubmit = (data) => {
    const parsedName = parseName(data.nameHu)

    if (
      !data?.nameHu ||
      !data?.phoneHu ||
      data?.phoneHu?.length < 7 ||
      !validateEmail(data?.emailHu)
    ) {
      return
    }

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
          name: 'inquiry',
          value: inquiryValue
        },
        {
          name: 'email',
          value: data?.emailHu
        },
        {
          name: 'phone',
          value: data?.phoneHu
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

  return (
    <div className={styles.section__contact}>
      <>
        {formHeading && (
          <div className={styles.section__contact__heading}>{formHeading}</div>
        )}
        {formSubheading && (
          <div
            className={styles.section__contact__subheading}
            dangerouslySetInnerHTML={{
              __html:
                locale === 'fr-fr'
                  ? 'Nos experts sont là pour vous aider à configurer la solution de surveillance optimale pour votre environnement.'
                  : 'Our experts are here to help configure the optimal monitoring solution for your environment.'
            }}
          />
        )}
        {!isFormSubmitted && (
          <Form
            onSubmit={(e) => onSubmit(e)}
            showSubmitButton={false}
            className={styles.section__contact__form}
            id="acfHeroContactForm"
          >
            <Text
              id="nameHu"
              className={styles.section__contact__form__inputgrp}
              label={getTranslation(headlessConfig, 'FULL_NAME')}
              isRequired={true}
              type="text"
              isDark={true}
            />
            <Text
              id="phoneHu"
              className={styles.section__contact__form__inputgrp}
              label={getTranslation(headlessConfig, 'PHONE_NUMBER')}
              isRequired={true}
              type="phone"
              isDark={true}
            />
            <Text
              id="emailHu"
              className={styles.section__contact__form__inputgrp}
              label={getTranslation(headlessConfig, 'WORK_EMAIL')}
              isRequired={true}
              type="email"
              isDark={true}
            />
            <Select
              id="industryHu"
              className={styles.section__contact__form__inputgrp}
              label={getTranslation(headlessConfig, 'INDUSTRY')}
              isRequired={true}
              getValue={setIndustryValue}
              options={selectOptionsIndustries.map((i) => {
                return {...i, text: getTranslation(headlessConfig, i.text)}
              })}
              isDark={true}
            />
            <Select
              id="inquiryHu"
              className={styles.section__contact__form__inputgrp}
              label={
                locale === 'fr-fr'
                  ? getTranslation(headlessConfig, 'Demande')
                  : getTranslation(headlessConfig, 'Inquiry')
              }
              isRequired={true}
              getValue={setInquiryValue}
              options={selectOptionsInquiries.map((i) => {
                return {...i, text: getTranslation(headlessConfig, i.text)}
              })}
              isDark={true}
            />
            <Button
              disabled={disabled}
              loading={loading}
              isSubmit={true}
              className={styles.section__contact__form__submit}
              text={getTranslation(headlessConfig, 'CONTACT_US')}
            />
            {errorMessage && (
              <div className={styles.section__contact__form__error}>
                {errorMessage}
              </div>
            )}
          </Form>
        )}
      </>
      {isFormSubmitted && (
        <div className={`${styles.section__contact__success}`}>
          {locale === 'fr-fr'
            ? getTranslation(
                headlessConfig,
                'Merci de rester en contact. Nous vous contacterons bientôt !'
              )
            : getTranslation(
                headlessConfig,
                "Thank you for getting in touch. We'll reach out soon!"
              )}
        </div>
      )}
    </div>
  )
}

AcfHeroContact.propTypes = {
  formHeading: PropTypes.string,
  formSubheading: PropTypes.string
}
