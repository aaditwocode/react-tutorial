// constants.js

// Mock / real data URL
export const SWIGGY_API_URL = `https://proxy.corsfix.com/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.626547&lng=77.092428&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
; // replace with real if needed

// Swiggy Menu API (if needed in future)
export const MENU_API_URL = `https://proxy.corsfix.com/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9046136&lng=77.614948&restaurantId=`;

// Swiggy CDN base for restaurant images
export const IMG_CDN_URL = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/`;

// Optional: original Swiggy path if you scrape raw
export const SWIGGY_REST_API_PATH = `data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants`;



