import { IMG_CDN_URL } from "../../public/common/constants.js";
import Shimmer from "./Shimmer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router";
import "../ResturantMenu.css";
import useResturantMenu from "../utils/useResturantMenu.jsx";
import MenuCategory from "./MenuCategory.jsx";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const restaurantInfo = useResturantMenu(resId);
    const [showIndex, setShowIndex] = useState(0);
    console.log(restaurantInfo);
    if (restaurantInfo === null) {
        return <Shimmer />;
    }

    const {
        cloudinaryImageId,
        name,
        avgRatingString,
        totalRatingsString,
        cuisines,
        locality,
        sla,
    } = restaurantInfo?.cards[2]?.card?.card?.info || {};

    const cards =
        restaurantInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

    let itemCards =
        cards.find((c) => c?.card?.card?.itemCards)?.card?.card?.itemCards || [];

    const categories = cards.filter(
        (c) =>
            c?.card?.["card"]?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
    return (
        <div className="max-w-6xl mx-auto p-5">
        <div className="flex gap-5 mb-5 p-5 bg-gray-100 rounded-lg shadow-md">
            <img
            src={IMG_CDN_URL + cloudinaryImageId}
            alt={name}
            className="w-64 h-50 rounded-lg object-fill"
            />
            <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-bold">{name}</h1>
            <h3 className="text-lg text-gray-600">{locality}</h3>
            <p className="text-sm text-gray-500">{cuisines?.join(", ")}</p>
            <div className="flex items-center space-x-2 text-sm">
                <div
                className={`text-white px-2 py-1 rounded-md flex items-center space-x-1 ${
                    avgRatingString >= 4 ? "bg-green-600" : "bg-red-500"
                }`}
                >
                <span>{avgRatingString || 3.8}</span>
                <FontAwesomeIcon icon={faStar} />
                <span>({totalRatingsString || "1K+ ratings"})</span>
                </div>
                <span>|</span>
                <span className="font-semibold">{sla.slaString}</span>
            </div>
            </div>
        </div>
        {categories.map((category,index)=>
            <MenuCategory
            key={category?.card?.card?.title}
            data={category?.card?.card}
            showMenuItems={index === showIndex}
            setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
            />
        )}
        </div>
    );
};

export default RestaurantMenu;