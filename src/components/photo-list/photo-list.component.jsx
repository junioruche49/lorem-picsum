import Photo from "../photo/photo.component";

const PhotoList = ({ photoList }) => {
  return (
    <div className="row">
      {photoList.map((data) => {
        return <Photo key={data.id} photoDetails={data} />;
      })}
    </div>
  );
};

export default PhotoList;
