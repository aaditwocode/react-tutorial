import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header.jsx';
import Body from './components/Body.jsx';
import './../index.css';
import Aboutus from "./components/Aboutus.jsx"
import ContactUs from './components/ContactUs.jsx';
import Error from "./components/Error.jsx";
import Footer from './components/Footer.jsx';
import RestaurantMenu from './components/RestaurantMenu.jsx';
import { createBrowserRouter,RouterProvider,Outlet} from "react-router";

const AppLayout = () => {
    return (
        <div className="app">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}
const appRouter = createBrowserRouter([
    {
        path:"/",
        element: <AppLayout/>,
        children:[
            {
                path:"/",
                element: <Body/>,
            },
            {
                path:"/about",
                element: <Aboutus/>
            },
            {
                path:"/contact",
                element: <ContactUs/>
            },
            {
                path:"/restaurants/:resId",
                element:<RestaurantMenu/>
            }
        ],
        errorElement: <Error/>,
        
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);