import SupportArticle from '../SupportArticle'
import styles from './SupportArticles.module.scss'
/**
 * Render the SupportArticles component.
 *
 * @author DAP
 * @param  {object}   props                           SupportArticles component props.
 * @param  {Array}    props.supportArticles           Articles
 * @param  {number}   props.activeArticleIndex        Active article index
 * @param  {Function} props.notifyActiveArticleChange Active article change
 * @return {Element}                                  The SupportArticles component.
 */
export default function SupportArticles({
  supportArticles,
  activeArticleIndex,
  notifyActiveArticleChange
}) {
  return (
    <div className={styles.articles}>
      {supportArticles
        ?.filter((a) => a.contentTypeName === 'support_articles')
        .map((article, index) => (
          <SupportArticle
            key={index}
            articleIndex={index}
            article={article}
            activeArticleIndex={activeArticleIndex}
            notifyActiveArticleChange={notifyActiveArticleChange}
          />
        ))}
    </div>
  )
}

SupportArticles.propTypes = {}
