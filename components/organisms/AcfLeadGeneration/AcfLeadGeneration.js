import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import {Select, Text} from '@/components/atoms/Inputs'
import Form from '@/components/molecules/Form'
import SectionHead from '@/components/molecules/SectionHead'
import {
  parseName,
  selectOptionsIndustries,
  validateEmail
} from '@/functions/services/hubspot'
import {getTranslation} from '@/functions/utility'
import axios from 'axios'
import classNames from 'classnames'
import {useWordPressContext} from 'components/common/WordPressProvider'
import PropTypes from 'prop-types'
import {useState} from 'react'
import styles from './AcfLeadGeneration.module.scss'

export const acfLeadgenFormFragment = `
  fragment AcfLeadgenFormFragment on AcfAcfLeadgenForm {
    acfFields {
      subheading
      phone
      heading
    }
  }
`

/**
 * Render the AcfLeadGeneration component.
 *
 * @param  {object}  props            AcfLeadGeneration component props.
 * @param  {string}  props.heading    Lead Generation form heading
 * @param  {string}  props.subheading Lead Generation form subheading
 * @param  {string}  props.phone      Lead Generation form contact phone number
 * @return {Element}                  The AcfLeadGeneration component.
 */
export default function AcfLeadGeneration(props) {
  const [industryValue, setIndustryValue] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const {headlessConfig} = useWordPressContext()
  const {heading, phone, subheading} = props

  const onSubmit = (data) => {
    const parsedName = parseName(data.nameLg)

    if (data?.phoneLg?.length < 7) {
      setErrorMessage(getTranslation(headlessConfig, 'VALIDATION_PHONE'))
      return
    }

    if (!validateEmail(data?.emailLg)) {
      setErrorMessage(getTranslation(headlessConfig, 'VALIDATION_EMAIL'))
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
          name: 'email',
          value: data?.emailLg
        },
        {
          name: 'phone',
          value: data?.phoneLg
        },
        {
          name: 'message',
          value: data?.messageLg
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

  const sectionClassnames = classNames(styles.section, {
    [styles['section--submitted']]: isFormSubmitted
  })

  return (
    <section className={styles.outer}>
      <Container className={sectionClassnames}>
        {!isFormSubmitted && (
          <>
            <SectionHead
              heading={heading}
              subheading={subheading}
              alignment="center"
              className={styles.section__sectionhead}
            />
            {phone && (
              <div className={styles.section__phone}>
                {getTranslation(headlessConfig, 'CALL')} - {phone}
              </div>
            )}
            <Form
              className={styles.section__form}
              onSubmit={onSubmit}
              showSubmitButton={false}
            >
              <div className={styles.section__form__twocol}>
                <Text
                  id="nameLg"
                  className={styles.section__form__twocol__inputgrp}
                  label={getTranslation(headlessConfig, 'FULL_NAME')}
                  isRequired={true}
                  type="text"
                  isDark={true}
                />
                <Text
                  id="phoneLg"
                  className={styles.section__form__twocol__inputgrp}
                  label={getTranslation(headlessConfig, 'PHONE_NUMBER')}
                  isRequired={true}
                  type="phone"
                  isDark={true}
                />
                <Text
                  id="emailLg"
                  className={styles.section__form__twocol__inputgrp}
                  label={getTranslation(headlessConfig, 'WORK_EMAIL')}
                  isRequired={true}
                  type="email"
                  isDark={true}
                />
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
                  isDark={true}
                />
              </div>
              <Text
                id="messageLg"
                className={styles.section__form__message}
                label={getTranslation(headlessConfig, 'MESSAGE')}
                isRequired={false}
                type="text"
                isDark={true}
              />
              <Button
                disabled={disabled}
                loading={loading}
                isSubmit={true}
                className={styles.section__form__submit}
                text={getTranslation(headlessConfig, 'CONTACT_US')}
              />
              {errorMessage && (
                <div className={styles.section__form__error}>
                  {errorMessage}
                </div>
              )}
            </Form>
          </>
        )}
        {isFormSubmitted && (
          <div className={styles.section__success}>
            {getTranslation(headlessConfig, 'MESSAGE_LEAD_SUBMIT_SUCCESS')}
          </div>
        )}
      </Container>
    </section>
  )
}

AcfLeadGeneration.propTypes = {
  heading: PropTypes.string,
  className: PropTypes.string,
  subheading: PropTypes.string,
  phone: PropTypes.string,
  leadgenType: PropTypes.array,
  onSubmit: PropTypes.func
}
