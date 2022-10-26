import { useContext } from "react";
import { useHistory } from "react-router-dom";
import shoppingBag from "../assets/img/shopping-bag.png";
import gallery from "../assets/img/gallery.png";
import { CartContext } from "../context/cart.context";

const Wrapper = ({ children }) => {
  const { cart } = useContext(CartContext);
  const history = useHistory();
  return (
    <div className="home-container">
      <div className="container mb-5 mt-2">
        <div className="row mb-5">
          <div className="col-6 text-left">
            <img
              src={gallery}
              alt="logo"
              className="pointer"
              onClick={() => history.push("/")}
            />
          </div>
          <div className="col-6 text-right">
            <img
              onClick={() => history.push("/cart")}
              src={shoppingBag}
              alt="shopping bag"
              className="justify-content-right pointer"
            />
            <span data-testid="cart-num" className="cart-num btn btn-link">
              {cart.length}
            </span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
