import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import {Text} from '@/components/atoms/Inputs'
import Form from '@/components/molecules/Form'
import {parseName, validateEmail} from '@/functions/services/hubspot'
import {getTranslation} from '@/functions/utility'
import axios from 'axios'
import {useState, useEffect} from 'react'
import styles from './ContactUs.module.scss'

/**
 * Render the ContactUs component.
 *
 * @param  {object}  props                ContactUs component props
 * @param  {object}  props.headlessConfig Headless config data
 * @return {Element}                      The ContactUs component.
 */
export default function ContactUs({headlessConfig}) {
  const [errorMessage, setErrorMessage] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const nameCu = document.getElementById('nameCu')
    const emailCu = document.getElementById('emailCu')

    if (nameCu) {
      nameCu.oninvalid = function (e) {
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

    if (emailCu) {
      emailCu.oninvalid = function (e) {
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
    const parsedName = parseName(data.nameCu)

    // if (data?.phoneCu !== '' && data?.phoneCu?.length < 7) {
    //   setErrorMessage(getTranslation(headlessConfig, 'VALIDATION_PHONE'))
    //   return
    // }

    // if (!validateEmail(data?.emailCu)) {
    //   setErrorMessage(getTranslation(headlessConfig, 'VALIDATION_EMAIL'))
    //   return
    // }

    if (!data?.nameCu || !validateEmail(data?.emailCu)) {
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
          name: 'email',
          value: data?.emailCu
        },
        {
          name: 'phone',
          value: data?.phoneCu
        },
        {
          name: 'message',
          value: data?.messageCu
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
          setIsSubmitted(true)
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
    <div className={styles.container}>
      {!isSubmitted && (
        <>
          <h2 className={styles.container__header}>
            {getTranslation(headlessConfig, 'CONTACT_US')}
          </h2>
          <span>
            {getTranslation(headlessConfig, 'CALL_US_AT')}{' '}
            <strong>
              {headlessConfig?.additionalSettings?.contactInfo?.hotline}
            </strong>
          </span>
          <div className={styles.container__formarea}>
            <Form
              onSubmit={onSubmit}
              showSubmitButton={false}
              formDefaults={{
                nameCu: '',
                emailCu: '',
                phoneCu: '',
                messageCu: ''
              }}
              className={styles.section__formarea__form}
              id="contactUsForm"
            >
              <Text
                id="nameCu"
                className={styles.container__formarea__form__textarea}
                label={getTranslation(headlessConfig, 'NAME')}
                isRequired={true}
                type="text"
              />
              <Text
                id="emailCu"
                className={styles.container__formarea__form__textarea}
                label={getTranslation(headlessConfig, 'WORK_EMAIL')}
                isRequired={true}
                type="email"
              />
              <Text
                id="phoneCu"
                className={styles.container__formarea__form__textarea}
                label={getTranslation(headlessConfig, 'PHONE_NUMBER')}
                optionalLabel={getTranslation(headlessConfig, 'OPTIONAL')}
                isRequired={false}
                type="tel"
              />
              <Text
                id="messageCu"
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
                text={getTranslation(headlessConfig, 'SUBMIT')}
                isSubmit={true}
              />
            </Form>
            {errorMessage && (
              <div className={styles.container__error}>
                <Icon size="lg" title="info" icon="info" />{' '}
                <strong className={styles['container__error--margin']}>
                  {errorMessage}
                </strong>
              </div>
            )}
            <p>
              {getTranslation(
                headlessConfig,
                'MESSAGE_MARKETING_COM_AGREEMENT'
              )}
            </p>
          </div>
        </>
      )}
      {isSubmitted && (
        <>
          <h2 className={styles.container__header}>
            {getTranslation(headlessConfig, 'THANKYOU')}
          </h2>
          <span>
            {getTranslation(headlessConfig, 'MESSAGE_MARKETING_COM_SUCCESS')}
          </span>
        </>
      )}
    </div>
  )
}
