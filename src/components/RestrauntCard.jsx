import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { IMG_CDN_URL } from '../../public/common/constants.js'; 

const RestaurantCard = ({
    id,
    cloudinaryImageId,
    name,
    areaName,
    sla,
    cuisines,
    costForTwo,
    avgRating,
    }) => {
    return (
        <Link to={"/restaurants/" + id}>
            <div className="w-64 h-80 bg-gray-200 rounded-lg shadow-md transition-transform duration-200 hover:scale-105">
                <img
                className="w-full h-[180px] rounded-md"
                src={IMG_CDN_URL + cloudinaryImageId}
                alt={name}
                />
                <h3 className="text-lg font-semibold mt-2 truncate">{name}</h3>
                <div className="flex items-center gap-3 mt-1">
                <p
                    className={`text-white text-sm font-semibold px-2 py-1 rounded-md flex items-center gap-1 ${
                    avgRating >= 4.0 ? "bg-green-500" : "bg-red-500"
                    }`}
                >
                    {avgRating}
                    <FontAwesomeIcon icon={faStar} />
                </p>
                <h4 className="text-sm text-gray-700">{costForTwo}</h4>
                <h4 className="text-sm text-gray-700">{sla.deliveryTime} mins</h4>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                <p className="truncate">{cuisines.join(", ")}</p>
                <p className="text-gray-500">{areaName}</p>
                </div>
            </div>
        </Link>
    );
};

export const makeDiscountCard = (RestaurantCard) =>{
    return (props)=>{
        const { aggregatedDiscountInfoV3 } = props;
        return (
            <div className="w-[250px] h-[300px] bg-white rounded-[8px] shadow-md cursor-pointer overflow-hidden hover:scale-[0.98] relative">
                {aggregatedDiscountInfoV3 && (
                <div className="text-gray-50 text-xl font-extrabold absolute top-[55%] left-[2px]">{`${aggregatedDiscountInfoV3.header} ${aggregatedDiscountInfoV3.subHeader}`}</div>
                )}
                <RestaurantCard {...props} />
            </div>
        );
    };
}
export default RestaurantCard;