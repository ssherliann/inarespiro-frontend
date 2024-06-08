import { useRef, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useBasket } from "../../contexts/BasketContext.jsx";
import { FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react";
import { postOrder } from "../../api.js";
import { Button } from "antd";
import styles from './Basket.module.css'

function Basket() {
  const { items, removeFromBasket, emptyBasket } = useBasket();
  const [address, setAddress] = useState(''); 
  const [Submitting, setSubmitting] = useState(''); 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  const handleSubmitForm = async () => {
    // Validate address
    if (!address.trim()) {
      console.error("Address is required");
      return;
    }
  
    // Disable button during submission
    setSubmitting(true);
  
    const itemIds = items.map((item) => item._id);
    const input = {
      address,
      items: JSON.stringify(itemIds),
    };
  
    try {
      await postOrder(input);
      emptyBasket();
      onClose();
      // Reset address field and enable button after successful submission
      setAddress('');
      setSubmitting(false);
      // Provide feedback to the user (optional)
      // You can show a toast or a message indicating successful submission
    } catch (error) {
      console.error("Failed to submit order:", error);
      setSubmitting(false); // Enable button on error
    }
  };
  
  

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
              <button className={styles.buyButton} onClick={onOpen}>Buy</button>
            </div>
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Address</FormLabel>  
                    <Textarea
                      ref={initialRef}
                      placeholder="Address"  
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={handleSubmitForm}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}

export default Basket;

