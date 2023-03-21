import Container from '@/components/atoms/Container'
import DisplayImage from '@/components/atoms/Image'
import SectionHead from '@/components/molecules/SectionHead'
import PropTypes from 'prop-types'
import styles from './AcfTeamMembersSection.module.scss'

export const acfTeamMembersSectionFragment = `
  fragment AcfTeamMembersSectionFragment on AcfAcfTeamMembersSection {
    acfFields {
      copy
      heading
      background {
        id
        altText
        mediaItemUrl
        mediaDetails {
          height
          width
        }
      }
      items {
        copy
        name
        title
        image {
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
 * Render the AcfTeamMembersSection component.
 *
 * @param  {object}  props            AcfTeamMembersSection component props.
 * @param  {string}  props.heading    The heading text.
 * @param  {string}  props.copy       The copy text.
 * @param  {Array}   props.items      The items for the section.
 * @param  {object}  props.background Decorative background image
 * @return {Element}                  The AcfTeamMembersSection component.
 */
export default function AcfTeamMembersSection({
  heading,
  copy,
  items,
  background
}) {
  return (
    <section>
      <Container className={styles.section}>
        <SectionHead
          heading={heading}
          subheading={copy}
          alignment="center"
          className={styles.section__head}
        />
        {items && items.length > 0 && (
          <div
            className={`${styles.section__items}  ${styles['grid']} ${styles['gap-sm']}`}
          >
            {items.map((item, index) =>
              index == 0 ? (
                <div
                  key={index}
                  className={`${styles['col-12']} ${styles['section__items__featured']}`}
                >
                  {background && (
                    <>
                      <DisplayImage
                        className={
                          styles['section__items__featured__background--left']
                        }
                        alt={background?.altText}
                        url={background?.mediaItemUrl}
                        imageMeta={background}
                        nextImageFill={true}
                      />
                      <DisplayImage
                        className={
                          styles['section__items__featured__background--right']
                        }
                        alt={background?.altText}
                        url={background?.mediaItemUrl}
                        imageMeta={background}
                        nextImageFill={true}
                      />
                    </>
                  )}

                  <div className={`${styles['grid']} ${styles['gap-sm']}`}>
                    <div
                      className={`${styles.section__items__featured__image} ${styles['col-12']} ${styles['col-6@sm']}`}
                    >
                      <DisplayImage
                        className={
                          styles['section__items__featured__image__elem']
                        }
                        alt={item.image?.altText}
                        url={item.image?.mediaItemUrl}
                        imageMeta={item.image}
                        nextImageFill={true}
                      />
                    </div>
                    <div
                      className={`${styles.section__items__featured__content} ${styles['col-12']} ${styles['col-6@sm']}`}
                    >
                      <div
                        className={
                          styles.section__items__featured__content__details
                        }
                      >
                        <div
                          className={
                            styles.section__items__featured__content__details__name
                          }
                        >
                          {item.name}
                        </div>
                        <div
                          className={
                            styles.section__items__featured__content__details__title
                          }
                        >
                          {item.title}
                        </div>
                        <div
                          className={
                            styles.section__items__featured__content__details__copy
                          }
                          dangerouslySetInnerHTML={{__html: item.copy}}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className={`${styles['col-12@sm']} ${styles['col-6@md']} ${styles['col-4@lg']}`}
                >
                  <div className={styles.section__items__regular}>
                    <DisplayImage
                      className={styles['section__items__regular__image__elem']}
                      alt={item.image?.altText}
                      url={item.image?.mediaItemUrl}
                      imageMeta={item.image}
                      nextImageFill={true}
                    />
                    <div
                      className={`${styles.section__items__regular__content}`}
                    >
                      <div
                        className={
                          styles.section__items__regular__content__details__name
                        }
                      >
                        {item.name}
                      </div>
                      <div
                        className={
                          styles.section__items__regular__content__details__title
                        }
                      >
                        {item.title}
                      </div>
                      <div
                        className={
                          styles.section__items__regular__content__details__copy
                        }
                        dangerouslySetInnerHTML={{__html: item.copy}}
                      ></div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </Container>
    </section>
  )
}

AcfTeamMembersSection.propTypes = {
  heading: PropTypes.string,
  copy: PropTypes.string,
  className: PropTypes.string,
  backgroundMeta: PropTypes.shape({
    altText: PropTypes.string,
    mediaItemUrl: PropTypes.string,
    mediaDetails: PropTypes.shape({
      height: PropTypes.number,
      sizes: PropTypes.array,
      width: PropTypes.number
    })
  }),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
      copy: PropTypes.string,
      image: PropTypes.shape({
        altText: PropTypes.string,
        mediaItemUrl: PropTypes.string,
        mediaDetails: PropTypes.shape({
          height: PropTypes.number,
          sizes: PropTypes.array,
          width: PropTypes.number
        })
      })
    })
  )
}

AcfTeamMembersSection.defaultProps = {}
