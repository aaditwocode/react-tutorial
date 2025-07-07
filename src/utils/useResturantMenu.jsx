import { useEffect,useState } from "react";
// import { MENU_API_URL } from "../../../public/common/constants";

const useResturantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);
    useEffect(()=>{
        fetchData();
    },[resId])
    const fetchData = async()=>{
        try {
            const data = await fetch("https://proxy.corsfix.com/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9046136&lng=77.614948&restaurantId="+ resId);
            const json = await data.json();
            setResInfo(json?.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setResInfo(null);
        }
    };
    
    return resInfo;
}

export default useResturantMenu;