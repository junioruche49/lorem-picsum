import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../../layouts/wrapper.components";
import { resolutions } from "../../constant/resolutions";
import cartBtn from "../../assets/img/cart-add.png";
import { CartContext } from "../../context/cart.context";
import Loading from "../../components/loading/loading.component";
import { ToastContainer, toast } from "react-toastify";

const PhotoDetails = () => {
  const [photo, setPhoto] = useState({});
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [priceDetails, setPriceDetails] = useState({
    ...resolutions[0],
  });

  const { id } = useParams();
  const { addCart } = useContext(CartContext);

  const fetchPhotoDetails = useCallback(async () => {
    try {
      const response = await fetch(`https://picsum.photos/id/${id}/info`);
      const data = await response.json();

      setPhoto(data);
    } catch (error) {
      toast(error.message);
    }
  }, [id]);

  const selectSize = (event) => {
    let size = event.target.value;
    let getSizeDetails = resolutions.find((data) => data.sign === size);
    setPriceDetails(getSizeDetails);
  };

  useEffect(() => {
    fetchPhotoDetails();
  }, [id, fetchPhotoDetails]);

  const addPhotoCartHandler = () => {
    setTotal((prev) => prev + priceDetails.amount);
    let newPhoto = {
      price: priceDetails.amount,
      size: { [priceDetails.sign]: 1 },
      qty: 1,
      productId: id,
    };
    addCart(newPhoto);
    toast("Added to cart successfully");
  };
  return (
    <Wrapper>
      <div>
        <ToastContainer />
      </div>
      <div className="row">
        <div className="col-9">
          {loading && <Loading />}
          <img
            src={`https://picsum.photos/id/${id}/800/500`}
            alt={photo.author}
            className="img-fluid"
            onLoad={() => setLoading(false)}
          />
        </div>
        <div className="col-3  d-flex  align-items-start flex-column justify-content-end">
          <h6>Author: {photo.author}</h6>
          <h6>Price: ${priceDetails.amount}</h6>
          <h6>Sizes:</h6>
          <select className="custom-select" onChange={selectSize}>
            {resolutions.map((size) => {
              return (
                <option key={size.sign} value={size.sign}>
                  {size.size}
                </option>
              );
            })}
          </select>
          {total ? `Total: ${total}` : ""}
          {total ? null : <br />}
          <button className="btn btn-block" onClick={addPhotoCartHandler}>
            <img src={cartBtn} alt="add to cart" /> Add to Cart
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default PhotoDetails;
