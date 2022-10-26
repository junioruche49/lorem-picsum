import { createContext, useState } from "react";

export const CartContext = createContext({
  cart: [],
  totalAmount: 0,
  addCart: () => {},
  removeCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addCart = (addCart) => {
    let prevCart = JSON.parse(JSON.stringify(cart));
    let prevTotalAmt = totalAmount;
    let getProductIndex = prevCart.findIndex(
      (data) => data.productId === addCart.productId
    );
    // let sameProductDiffSize = prevCart.findIndex(
    //   (data) =>
    //     data.productId === addCart.productId && data.size !== addCart.size
    // );

    if (getProductIndex < 0) {
      prevCart.push(addCart);
      prevTotalAmt += addCart.price;
    } else {
      prevCart[getProductIndex].qty = ++prevCart[getProductIndex].qty;
      prevCart[getProductIndex].price += addCart.price;
      prevCart[getProductIndex].size[Object.keys(addCart.size)[0]] =
        prevCart[getProductIndex].size[Object.keys(addCart.size)[0]] + 1 || 1;
      prevTotalAmt += addCart.price;
    }
    setTotalAmount(prevTotalAmt);
    setCart(prevCart);
  };

  const removeCart = (removeCart, cartDetails) => {
    let prevCart = JSON.parse(JSON.stringify(cart));
    let prevTotalAmt = totalAmount;

    let getProductIndex = prevCart.findIndex(
      (data) => data.productId === removeCart.productId
    );
    if (prevCart[getProductIndex].qty > 1) {
      prevCart[getProductIndex].qty = --prevCart[getProductIndex].qty;
      prevCart[getProductIndex].price -= cartDetails.amount;
      if (prevCart[getProductIndex].size[cartDetails.size] === 1) {
        delete prevCart[getProductIndex].size[cartDetails.size];
      } else {
        prevCart[getProductIndex].size[cartDetails.size] =
          prevCart[getProductIndex].size[cartDetails.size] - 1;
      }
      prevTotalAmt -= cartDetails.amount;
    } else {
      prevTotalAmt -= prevCart[getProductIndex].price;
      prevCart = prevCart.filter(
        (data) => data.productId !== prevCart[getProductIndex].productId
      );
      //   delete prevCart[getProductIndex];
    }
    setTotalAmount(prevTotalAmt);
    setCart(prevCart);
  };

  const values = {
    cart: cart,
    totalAmount: totalAmount,
    addCart: addCart,
    removeCart: removeCart,
  };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
