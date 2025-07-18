import RestaurantCard from "./RestrauntCard.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { faMagnifyingGlass, faWifi } from "@fortawesome/free-solid-svg-icons";
import { SWIGGY_API_URL, SWIGGY_REST_API_PATH } from "../../public/common/constants.js"; 
import Shimmer from "./Shimmer";
import  useOnlineStatus from "../utils/useOnlineStatus.jsx";

const Body= () => {
    const {
        loading,
        filteredRestaurants,
        searchRestaurant,
        setSearchRestaurant,
        handleSearch,
        resData,
        loadMore,
        hasMore
    } = useRestaurants();
    
    const OnlineStatus=useOnlineStatus();
    if (!OnlineStatus) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center bg-red-100 text-red-700 p-5 rounded-lg shadow-lg">
                <FontAwesomeIcon icon={faWifi} className="text-6xl mb-2 animate-pulse" />
                <h1 className="text-3xl font-bold">You're Offline</h1>
                <p className="text-lg mt-2">Check your connection and try again.</p>
            </div>
        );
    }
    if(loading){
        return <Shimmer/>;
    }
    if (resData.length === 0) {
        return <div>No restaurants found.</div>;
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
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                    handleSearch();
                    }
                }}
                />
                <button
                className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
                onClick={handleSearch}
                >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        
            <div className="flex flex-wrap justify-center gap-6">
                {filteredRestaurants.length !== 0 ? (
                filteredRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant?.info?.id} {...restaurant?.info} />
                ))
                ) : (
                <h2 className="text-center text-xl font-semibold">
                    Sorry, we couldn't find any restaurant for "{restaurantName}"
                </h2>
                )}
            </div>
            {/* {hasMore && (
                <div className="flex justify-center my-6">
                    <button
                        onClick={loadMore}
                        className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                    >
                        Show More
                    </button>
                </div>
            )} */}
        </div>
    );
};

export default Body;