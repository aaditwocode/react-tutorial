import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { IMG_CDN_URL } from '../../public/common/constants.js'; // adjust if in src/constants.js

const styleCard = {
  backgroundColor: "#e8e9eb",
  borderRadius: "10px",
  padding: "10px",
  width: "250px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const RestaurantCard = ({
  name,
  cuisines,
  avgRating,
  areaName,
  cloudinaryImageId,
}) => {
  const imageUrl = cloudinaryImageId
    ? IMG_CDN_URL + cloudinaryImageId
    : "/image1.png"; // fallback

  return (
    <div className="res-card" style={styleCard}>
      <img
        src={imageUrl}
        alt={`${name} logo`}
        style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px" }}
      />
      <h3>{name}</h3>
      <p>{cuisines?.join(", ")}</p>
      <p>
        <FontAwesomeIcon icon={faStar} style={{ color: "orange" }} /> {avgRating}
      </p>
      <p>{areaName}</p>
    </div>
  );
};

export default RestaurantCard;
