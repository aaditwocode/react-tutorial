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
            // Try direct API first
            const response = await fetch(
                "https://corsproxy.io/?" + 
                encodeURIComponent(
                    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.626547&lng=77.092428&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
                ),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const json = await response.json();

            // Updated data extraction logic
            const restaurants = json?.data?.cards?.find(
                card => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
            )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

            if (restaurants.length === 0) {
                throw new Error("No restaurants found in response");
            }

            setList(restaurants);
            setFilteredRestaurants(restaurants);
        } catch (error) {
            console.error("API Error:", error);
            // Fallback to mock data
            setList(mockData);
            setFilteredRestaurants(mockData);
            setError("Using sample data - API failed: " + error.message);
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

    return (
        <div className="p-5">
            <div className="flex justify-center gap-4 my-5">
                <input 
                    type="text" 
                    className="w-4/5 p-3 border border-gray-300 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
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
                    className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    onClick={handleSearch}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>

            {error && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
                    <p className="text-yellow-700">{error}</p>
                </div>
            )}

            <div className="flex flex-wrap gap-5 justify-center">
                {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant?.info?.id}
                            {...restaurant?.info}
                        />
                    ))
                ) : (
                    <h2 className="text-xl font-semibold">
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