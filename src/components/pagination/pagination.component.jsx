const Pagination = ({ onChangePage }) => {
  return (
    <div className="row">
      <div className="col-12 text-center">
        <button className="btn" onClick={() => onChangePage("prev")}>
          Prev
        </button>
        <button className="btn" onClick={() => onChangePage("next")}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
