import RestaurantCard from "./RestrauntCard.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { faMagnifyingGlass, faWifi } from "@fortawesome/free-solid-svg-icons";
import { SWIGGY_API_URL, SWIGGY_REST_API_PATH } from "../../public/common/constants.js"; 
import Shimmer from "./Shimmer";
import  useOnlineStatus from "../utils/useOnlineStatus.jsx";

const Body = () => {
    const [resData, setList] = useState([]);
    const [searchRestaurant, setSearchRestaurant] = useState("");
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [restaurantName, setRestaurantName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleSearch = () => {
        const filtered = resData.filter((res) =>
            res?.info?.name?.toLowerCase().includes(searchRestaurant.toLowerCase())
        );
        setFilteredRestaurants(filtered);
        setRestaurantName(searchRestaurant);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("https://proxy.corsfix.com/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.626547&lng=77.092428&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status}`);
            }
            const json = await response.json();

            // Safer alternative to eval()
            const pathParts =data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants.split('.');
            let restaurants = json;
            for (const part of pathParts) {
                restaurants = restaurants?.[part];
                if (restaurants === undefined) break;
            }
            restaurants = Array.isArray(restaurants) ? restaurants : [];

            if (restaurants.length === 0) {
                throw new Error("No restaurants data found");
            }

            setList(restaurants);
            setFilteredRestaurants(restaurants);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onlineStatus = useOnlineStatus();
    if (!onlineStatus) {
        return (
            <div className="offline-container">
                <FontAwesomeIcon icon={faWifi} className="offline-icon" />
                <h1 className="offline-text">You're Offline</h1>
                <p className="offline-subtext">Check your connection and try again.</p>
            </div>
        );
    }

    if (isLoading) {
        return <Shimmer />;
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>Something went wrong</h2>
                <p>{error}</p>
                <button onClick={fetchData}>Try Again</button>
            </div>
        );
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
                <button
                    className="search-icon"
                    onClick={handleSearch}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
            <div className="res-container">
                {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant?.info?.id}
                            {...restaurant?.info}
                        />
                    ))
                ) : (
                    <h2>
                        {restaurantName 
                            ? `Sorry, we couldn't find any restaurant for "${restaurantName}"`
                            : "No restaurants available"}
                    </h2>
                )}
            </div>
        </div>
    );
};

export default Body;