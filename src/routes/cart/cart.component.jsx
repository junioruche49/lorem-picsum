import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { resolutions } from "../../constant/resolutions";
import { CartContext } from "../../context/cart.context";
import Wrapper from "../../layouts/wrapper.components";
import deleteCart from "../../assets/img/delete.png";
import emptyCart from "../../assets/img/shopping-cart-empty.png";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
  const { cart, totalAmount, removeCart } = useContext(CartContext);
  let history = useHistory();

  const removeCartHandler = (selectedCart, cartDetails) => {
    removeCart(selectedCart, cartDetails);
    toast("Removed from cart successfully");
  };

  return (
    <Wrapper>
      <div>
        <ToastContainer />
      </div>
      {!cart.length && (
        <div className="row mb-4">
          <div className="col-12 text-center">
            <img src={emptyCart} alt="empty-cart" />
            <h6>Empty Cart</h6>
          </div>
        </div>
      )}
      {cart.map((photo) => {
        return (
          <div className="row mb-4">
            <div className="col-8">
              <img
                src={`https://picsum.photos/id/${photo.productId}/500/200`}
                alt="cart"
                className="img-fluid pointer"
                onClick={() => {
                  history.push(`/photo/${photo.productId}`);
                }}
              />
            </div>
            <div className="col-4  d-flex  align-items-end flex-column justify-content-end">
              <h6>Sizes:</h6>
              {/* <select className="custom-select" disabled> */}
              {Object.keys(photo.size).map((size) => {
                return (
                  <p>
                    {`${size} - ${photo.size[size]}`} -{" "}
                    <img
                      onClick={() =>
                        removeCartHandler(photo, {
                          size,
                          amount: resolutions.find((data) => data.sign === size)
                            .amount,
                        })
                      }
                      src={deleteCart}
                      alt="add to cart"
                    />
                  </p>
                );
              })}
              <h6>Price: ${photo.price}</h6>
            </div>
            <hr />
          </div>
        );
      })}
      {cart.length > 0 && (
        <div className="row mb-5 mt-5">
          <div className="col-12 text-right">
            <h6>Total Amount: ${totalAmount}</h6>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Cart;
