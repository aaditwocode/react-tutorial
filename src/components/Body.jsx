import RestaurantCard from "./RestrauntCard.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SWIGGY_API_URL } from "../../public/common/constants.js"; 
import Shimmer from "./Shimmer";

const Body = () => {
  const [resData, setList] = useState([])
  const [searchRestaurant, setSearchRestaurant] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");

  const handleSearch = () => {
    const filtered = resData.filter((res) =>
      res.info.name.toLowerCase().includes(searchRestaurant.toLowerCase())
    );
    setFilteredRestaurants(filtered);
    setRestaurantName(searchRestaurant);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(SWIGGY_API_URL);
      const json = await response.json();

      let restaurants = [];

      for (let i = 0; i < json?.data?.cards?.length; i++) {
        const maybeList =
          json.data.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        if (maybeList) {
          restaurants = maybeList;
          break;
        }
      }

      setList(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (error) {
      console.error("Failed to fetch restaurant data:", error);
    }
  };

  if (resData.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search restaurants..."
          value={searchRestaurant}
          onChange={(e) => setSearchRestaurant(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button className="search-icon" onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      <div className="res-container">
        {filteredRestaurants.length !== 0 ? (
          filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant?.info?.id}
              name={restaurant?.info?.name}
              cuisines={restaurant?.info?.cuisines}
              avgRating={restaurant?.info?.avgRating}
              areaName={restaurant?.info?.areaName}
              cloudinaryImageId={restaurant?.info?.cloudinaryImageId}
            />
          ))
        ) : (
          <h2>Sorry, no restaurants found for "{restaurantName}"</h2>
        )}
      </div>
    </div>
  );
};

export default Body;
