import Spinner from "../../assets/img/Spinner.gif";

const Loading = () => {
  return (
    <div className="row ">
      <div className="col-12 text-center">
        <img src={Spinner} alt="loading" />
      </div>
    </div>
  );
};

export default Loading;
