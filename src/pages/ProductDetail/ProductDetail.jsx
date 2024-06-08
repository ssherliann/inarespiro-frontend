/* eslint-disable jsx-a11y/img-redundant-alt */
import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchProduct } from '../../api';
import { useBasket } from '../../contexts/BasketContext';
import { useAuth } from '../../contexts/AuthContext';
import { IoArrowBackOutline } from "react-icons/io5";
import styles from './ProductDetail.module.css';

function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();
  const { loggedIn } = useAuth();
  const refs = useRef([]);

  const { isLoading, isError, data } = useQuery(['product', product_id], () =>
    fetchProduct(product_id)
  );

  console.log({ isLoading, isError, data });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error: Failed to load product.</div>;
  }

  const handleAddToBasket = () => {
    addToBasket(data, items.find(item => item._id === product_id));
  };

  return (
    <div className={styles.productContainer}>
      <Link to={-1} className={styles.backButton}><IoArrowBackOutline /></Link>
      <div className={styles.buttons}>
        <ul>
          {data.photos.map((photo, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  refs.current[index]?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={styles.button}
              >
                <img src={photo} alt={`Photo ${index + 1}`} className={styles.buttonsImages} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul className={styles.gallery}>
          {data.photos.map((photo, index) => (
            <li key={index} ref={el => (refs.current[index] = el)}>
              <img src={photo} alt={`Photo ${index + 1}`} className={styles.photo} />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.productInfo}>
        <p className={styles.productInfoTitle}>{data.title}</p>
        <p className={styles.productInfoPrice}>{data.price}$</p>
        <p className={styles.productInfoDescription}>{data.description}</p>
        {loggedIn ? (
          <button
            onClick={handleAddToBasket}
            className={`${styles.productInfoBuyButton} ${items.some(item => item._id === product_id) ? styles.remove : ''}`}
          >
            {items.some(item => item._id === product_id) ? 'Remove from cart' : 'Add to cart'}
          </button>
        ) : (
          <p>Please log in to add items to your cart.</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
