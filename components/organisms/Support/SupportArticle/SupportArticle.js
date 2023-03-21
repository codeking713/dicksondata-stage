import Accordion from '@/components/molecules/Accordion'
import {useEffect, useRef} from 'react'
import styles from './SupportArticle.module.scss'
import {v4 as uuidv4} from 'uuid'

/**
 * Render the SupportArticle component.
 *
 * @author DAP
 * @param  {object}   props                           SupportArticle component props.
 * @param  {object}   props.article                   Article
 * @param  {number}   props.activeArticleIndex        Active Article index
 * @param  {number}   props.articleIndex              Article index
 * @param  {Function} props.notifyActiveArticleChange Handle active article index change
 * @return {Element}                                  The SupportArticle component.
 */
export default function SupportArticle({
  articleIndex,
  article,
  activeArticleIndex,
  notifyActiveArticleChange
}) {
  const scrollToRef = useRef(null)
  const scrollToElement = () => {
    scrollToRef.current.style.scrollMargin = '120px'
    scrollToRef.current.scrollIntoView(true)
  }

  useEffect(() => {
    if (activeArticleIndex === articleIndex) scrollToElement()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeArticleIndex])

  return (
    <div ref={scrollToRef}>
      <Accordion
        key={uuidv4()}
        index={articleIndex}
        title={article.title}
        content={article.content}
        defaultActive={activeArticleIndex === articleIndex}
        notifyToggleAccordion={notifyActiveArticleChange}
        accordionTitleClassName={styles.articles__header}
        accordionTextClassName={styles.articles__content}
      />
    </div>
  )
}

SupportArticle.propTypes = {}
