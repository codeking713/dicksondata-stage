import React, {useState} from 'react'
import GlobalModal from '../molecules/GlobalModal'
export const ModalContext = React.createContext([{}, () => {}])

export const ModalProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const [content, setContent] = useState(null)
  const [isCloseButtonVisible, setIsCloseButtonVisible] = useState(true)
  const [isShouldCloseOnOverlayClick, setIsShouldCloseOnOverlayClick] =
    useState(true)

  return (
    <ModalContext.Provider
      value={[
        setIsOpen,
        setModalContent,
        setContent,
        setIsCloseButtonVisible,
        setIsShouldCloseOnOverlayClick,
        isOpen,
        modalContent,
        content,
        isCloseButtonVisible,
        isShouldCloseOnOverlayClick
      ]}
    >
      <GlobalModal
        isOpen={isOpen}
        modalContent={modalContent}
        content={content}
        isCloseButtonVisible={isCloseButtonVisible}
        isShouldCloseOnOverlayClick={isShouldCloseOnOverlayClick}
        setIsOpen={setIsOpen}
        setContent={setContent}
        setIsCloseButtonVisible={setIsCloseButtonVisible}
        setIsShouldCloseOnOverlayClick={setIsShouldCloseOnOverlayClick}
      />
      {children}
    </ModalContext.Provider>
  )
}
