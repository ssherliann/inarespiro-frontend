import { useState, createContext, useContext, useEffect } from "react";

const BasketContext = createContext();

const getUserBasket = (userId) => {
  try {
    return JSON.parse(localStorage.getItem(`basket_${userId}`)) || [];
  } catch (error) {
    console.error("Error reading user basket from localStorage:", error);
    return [];
  }
};

const BasketProvider = ({ children, userId }) => {
  const [items, setItems] = useState(userId ? getUserBasket(userId) : []);

  useEffect(() => {
    if (userId) {
      try {
        localStorage.setItem(`basket_${userId}`, JSON.stringify(items));
      } catch (error) {
        console.error("Error writing user basket to localStorage:", error);
      }
    }
  }, [items, userId]);

  const addToBasket = (data, findBasketItem) => {
    if (!findBasketItem) {
      return setItems((items) => [data, ...items]);
    }

    const filtered = items.filter((item) => item._id !== findBasketItem._id);
    setItems(filtered);
  };

  const removeFromBasket = (item_id) => {
    if (!item_id) return;
    const filtered = items.filter((item) => item._id !== item_id);
    setItems(filtered);
  };

  const emptyBasket = () => {
    setItems([]);
    if (userId) {
      localStorage.removeItem(`basket_${userId}`);
    }
  };

  const values = {
    items,
    setItems,
    addToBasket,
    removeFromBasket,
    emptyBasket,
  };

  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};

const useBasket = () => useContext(BasketContext);

export { BasketProvider, useBasket };
