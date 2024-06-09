import { useRef, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useBasket } from "../../contexts/BasketContext.jsx";
import {
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Textarea,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { postOrder } from "../../api.js";
import toast from 'react-hot-toast';
import styles from './Basket.module.css';

function Basket() {
  const { items, removeFromBasket, emptyBasket } = useBasket();
  const [address, setAddress] = useState(''); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item._id);
    const input = {
      address,
      items: itemIds,
      firstName,
      lastName,
    };

    try {
      await postOrder(input);
      toast.success('Order placed successfully!'); // Show success message using react-hot-toast
      emptyBasket();
      onClose();
    } catch (error) {
      console.error("Failed to submit order:", error);
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
            </div>
            <button className={styles.buyButton} onClick={onOpen}>Buy</button>
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>PLease, enter your address!</FormLabel>  
                    <Textarea
                      ref={initialRef}
                      placeholder="Address"  
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter className={styles.modalFooter}>
                  <button onClick={handleSubmitForm} className={styles.saveButton}>
                    Save
                  </button>
                  <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
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
