import PageNotifications from '@/components/molecules/PageNotifications'
import classNames from 'classnames'
import {useState} from 'react'
import ProductCard from '../../ProductCard'
import styles from './ProductDetailsAdditionalProducts.module.scss'

const ProductDetailsAdditionalProducts = ({products, heading, className}) => {
  const mainClassnames = classNames(className, styles.main)
  const [productsListNotification, setProductsListNotification] = useState(null)
  const handleNotifyError = (notification) => {
    setProductsListNotification(notification)
  }
  return (
    <section className={mainClassnames}>
      <div className={styles.main__inner}>
        <h2 className={styles.main__inner__heading}>{heading}</h2>
        <PageNotifications
          {...productsListNotification}
          closeNotification={() => setProductsListNotification(null)}
        />
        {products.length > 0 && (
          <div className={styles.main__inner__products}>
            {products.map((product, index) => (
              <div
                className={styles.main__inner__products__product}
                key={`$product-${index}`}
              >
                <ProductCard
                  product={product}
                  handleNotifyError={handleNotifyError}
                  productOverview={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductDetailsAdditionalProducts
