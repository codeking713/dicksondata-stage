import Icon from '@/components/atoms/Icon'
import ContactUs from '@/components/organisms/ContactUs'
import {getTranslation} from '@/functions/utility'
import {useWordPressContext} from 'components/common/WordPressProvider'
import React, {useEffect} from 'react'
import Modal from 'react-modal'
import styles from './GlobalModal.module.scss'

/**
 * Render the GlobalModal component.
 *
 * @param  {object}           props                             GlobalModal component props.
 * @param  {Function}         props.isOpen                      The toggle value
 * @param  {string}           props.modalContent                The modal content option
 * @param  {Element | string} props.content                     The modal content
 * @param  {Function}         props.setIsOpen                   The model toggle function
 * @param  {Function}         props.setContent                  The model content change function
 * @param  {boolean}          props.isCloseButtonVisible        Define if the close button will be visible
 * @param  {boolean}          props.isShouldCloseOnOverlayClick Define if clicking on the overlay will close the model
 * @return {Element}                                            The GlobalModal component.
 */
export default function GlobalModal({
  isOpen,
  modalContent,
  content,
  isCloseButtonVisible,
  isShouldCloseOnOverlayClick,
  setIsOpen,
  setContent
}) {
  const {headlessConfig} = useWordPressContext()
  const CONTACT_US = 'Contact Us'
  const THANK_YOU = 'Thank You'
  const NOTHING = 'Nothing'
  useEffect(() => {
    switch (modalContent) {
      case CONTACT_US:
        setContent(<ContactUs headlessConfig={headlessConfig} />)
        break
      case THANK_YOU:
        setContent(<ThankYouState headlessConfig={headlessConfig} />)
        break
      case NOTHING:
        setContent(<NothingState headlessConfig={headlessConfig} />)
        break
      default:
        return null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalContent, isOpen])
  const style = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.66)',
      zIndex: 10000
    },
    content: {
      margin: '0 auto',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      border: 'none',
      padding: '2rem',
      marginRight: '-40%',
      overflow: 'auto',
      maxHeight: '85%',
      transform: 'translate(-50%, -50%)'
    }
  }

  Modal.setAppElement('#modal-root')

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={style}
      shouldCloseOnOverlayClick={isShouldCloseOnOverlayClick}
    >
      {isCloseButtonVisible && (
        <div onClick={() => setIsOpen(false)} className={styles.modal__header}>
          <Icon title="closeCircle" style="fill" icon="closeCircle" />
        </div>
      )}

      {content}
    </Modal>
  )
}

GlobalModal.defaultProps = {
  isCloseButtonVisible: true,
  isShouldCloseOnOverlayClick: false
}

export const ThankYouState = ({headlessConfig}) => {
  return (
    <div className={styles.modal__success}>
      <Icon title="checkmarkCircle" style="fill" icon="checkmarkCircle" />{' '}
      {getTranslation(headlessConfig, 'MESSAGE_SUBMIT_COMPLETE')}
    </div>
  )
}

export const NothingState = ({headlessConfig}) => {
  return (
    <div className={styles.modal__success}>
      {getTranslation(headlessConfig, 'CONTENT_NOT_AVAILABLE')}
    </div>
  )
}
