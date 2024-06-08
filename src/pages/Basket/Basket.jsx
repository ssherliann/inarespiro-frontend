import { IoIosCloseCircle } from "react-icons/io";
import { useBasket } from "../../contexts/BasketContext.jsx";
import styles from './Basket.module.css'

function Basket() {
  const { items, removeFromBasket } = useBasket();
  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  return (
    <div className={styles.shoppingCart}>
      <p className={styles.cartTitle}>Your Cart</p>
      {items.length < 1 && (
        <p className={styles.cartIsEmpty}>Cart is empty</p>
      )}
      {items.length > 0 && (
          <div className={styles.cartNotEmpty}>
            <div className={styles.cartItems}>
              <div className={styles.itemHeader}>
                <p>PRODUCT</p>
                <p>PRICE</p>
              </div>
              <div className={styles.cartItemContainer}>
                <ul>
                  {items.map((item) => (
                    <li key={item._id} className={styles.cartItem}>
                      <a href={`/product/${item._id}`}>
                        <div className={styles.itemInfo}>
                          <img
                            loading="lazy"
                            src={item.photos[0]}
                            alt="cart item"
                            className={styles.itemImage}
                          />
                            <span className={styles.itemTitle}>{item.title}</span>
                            <span className={styles.itemPrice}>{item.price} $</span>
                        </div>
                      </a>
                      <button onClick={() => removeFromBasket(item._id)} className={styles.removeButton}>
                        <IoIosCloseCircle />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.cartTotalContainer}>
              <div className={styles.cartTotal}>
                <p className={styles.cartSummary}>Summary</p>
                <div className={styles.cartItemsInfo}>
                  <p className={styles.cartItemAmount}>ITEMS {items.length}</p>
                  <p className={styles.totalAmountText}>Total: {total}$</p>
                </div>
              </div>
          </div>
        </div>
      )}
    </div>
)}

export default Basket;
