import { useCallback, useEffect, useState } from "react";
import Loading from "../../components/loading/loading.component";
import Pagination from "../../components/pagination/pagination.component";
import PhotoList from "../../components/photo-list/photo-list.component";
import Wrapper from "../../layouts/wrapper.components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pagination}&limit=25`
      );
      setLoading(false);

      const data = await response.json();
      setPhotos(data);
    } catch (error) {}
  }, [pagination]);

  const changePage = (type) => {
    if (type === "next") {
      setPagination((prev) => {
        return ++prev;
      });
    } else {
      if (pagination === 1) {
        return;
      }
      setPagination((prev) => {
        return --prev;
      });
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [pagination, fetchPhotos]);

  return (
    <Wrapper>
      <div>
        <ToastContainer />
      </div>
      {loading && <Loading />}
      <PhotoList photoList={photos} />
      <Pagination onChangePage={changePage} />
    </Wrapper>
  );
};

export default Home;
