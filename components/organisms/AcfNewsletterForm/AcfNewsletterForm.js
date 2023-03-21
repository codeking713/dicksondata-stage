import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import {Text} from '@/components/atoms/Inputs'
import Form from '@/components/molecules/Form'
import SectionHead from '@/components/molecules/SectionHead'
import {validateEmail} from '@/functions/services/hubspot'
import {getTranslation} from '@/functions/utility'
import axios from 'axios'
import {useWordPressContext} from 'components/common/WordPressProvider'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'
import styles from './AcfNewsletterForm.module.scss'

export const acfNewsletterFormFragment = `
  fragment AcfNewsletterFormFragment on AcfAcfNewsletterForm {
    acfFields {
      sectionCopy
      sectionHeading
      signupOptInText
    }
  }
`

/**
 * Render the AcfNewsletterForm component.
 *
 * @param  {object}  props                 AcfNewsletterForm component props.
 * @param  {string}  props.sectionHeading  Newsletter form heading
 * @param  {string}  props.sectionCopy     Newsletter form subheading
 * @param  {string}  props.signupOptInText Newsletter form contact phone number
 * @return {Element}                       The AcfNewsletterForm component.
 */
export default function AcfNewsletterForm({
  sectionCopy,
  sectionHeading,
  signupOptInText
}) {
  const {headlessConfig} = useWordPressContext()
  const [errorMessage, setErrorMessage] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const {locale} = useRouter()

  useEffect(() => {
    const emailNl = document.getElementById('emailNl')

    if (emailNl) {
      emailNl.oninvalid = function (e) {
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
    if (!validateEmail(data?.emailNl)) {
      return
    }

    const payload = {
      formType: 'Newsletter',
      formData: [
        {
          name: 'email',
          value: data.emailNl
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
    <section className={styles.section}>
      {!isFormSubmitted && (
        <Container>
          <SectionHead
            heading={sectionHeading}
            subheading={sectionCopy}
            alignment="center"
            className={styles.section__head}
          />
          <div className={styles.section__form}>
            <Form
              onSubmit={onSubmit}
              showSubmitButton={false}
              className={styles.section__form__main}
              id="acfNewsletterForm"
            >
              <Text
                id="emailNl"
                className={styles.section__form__main__input}
                label={getTranslation(headlessConfig, 'WORK_EMAIL')}
                isRequired={true}
                type="email"
              />
              <Button
                className={styles.section__form__main__button}
                isSubmit={true}
                disabled={disabled}
                loading={loading}
                text={getTranslation(headlessConfig, 'SIGNUP')}
              />
            </Form>
            <div className={styles.section__form__message}>
              <div className={styles.section__form__message__optin}>
                {signupOptInText
                  ? signupOptInText
                  : getTranslation(
                      headlessConfig,
                      'MESSAGE_NEWSLETTER_AGREEMENT'
                    )}
              </div>
            </div>
            {errorMessage && (
              <div className={styles.section__form__errormessage}>
                {errorMessage}
              </div>
            )}
          </div>
        </Container>
      )}
      {isFormSubmitted && (
        <Container>
          <SectionHead
            heading={getTranslation(
              headlessConfig,
              'MESSAGE_NEWSLETTER_HEADING'
            )}
            subheading={
              locale === 'fr-fr'
                ? getTranslation(
                    headlessConfig,
                    'Merci de rester en contact. Nous vous contacterons bientôt !'
                  )
                : getTranslation(
                    headlessConfig,
                    "Thank you for getting in touch. We'll reach out soon!"
                  )
            }
            alignment="center"
            className={styles.section__head}
          />
        </Container>
      )}
    </section>
  )
}

AcfNewsletterForm.defaultProps = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  signupOptInText: PropTypes.string
}
