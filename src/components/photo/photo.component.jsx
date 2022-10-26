import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../loading/loading.component";
import AddToCart from "../../assets/img/add-to-cart.png";
import { CartContext } from "../../context/cart.context";
import { resolutions } from "../../constant/resolutions";

const Photo = ({ photoDetails }) => {
  const [loading, setLoading] = useState(true);
  const { addCart } = useContext(CartContext);

  let history = useHistory();

  const addPhotoCartHandler = () => {
    let newPhoto = {
      price: resolutions[0].amount,
      size: { [resolutions[0].sign]: 1 },
      qty: 1,
      productId: photoDetails.id,
    };
    addCart(newPhoto);
  };

  return (
    <div className="col-4 mb-4 ">
      {loading && <Loading />}
      <div className="over-flow img-fluid">
        <img
          onClick={() => {
            history.push(`/photo/${photoDetails.id}`);
          }}
          src={`https://picsum.photos/id/${photoDetails.id}/350/300`}
          alt={`${photoDetails.author} data-${photoDetails.id} img`}
          className="img-fluid photo-zoom pointer"
          onLoad={() => setLoading(false)}
        />
      </div>
      <div className="row">
        <div className="col-9 p-2 pl-3">
          <h5
            onClick={() => {
              history.push(`/photo/${photoDetails.id}`);
            }}
            className="pointer"
          >
            {photoDetails.author}
          </h5>
        </div>
        <div className="col-3 p-2 pr-3 text-right">
          <button className="btn btn-link p-none">
            <img
              src={AddToCart}
              alt="adding cart"
              onClick={addPhotoCartHandler}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Photo;
