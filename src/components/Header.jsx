import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import {useState} from "react";
import { Link } from "react-router";

const Header = () => {
    const [btnName,changeBtn]=useState("Login");
    return (
        <div className="font-sans text-gray-900 flex justify-between border-2 border-black bg-[#FBF5DD] shadow-md rounded-b-[15px] px-4 py-2">
            <div className="flex items-center">
                <img className="w-50" src="https://c8.alamy.com/comp/RKYBE3/restaurant-menu-food-logo-icon-vector-concept-flat-design-RKYBE3.jpg "/>
            </div>
            <div className="flex items-center space-x-6 text-lg">
                <ul className='flex px-4'>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact">
                            Contact Us
                        </Link>
                    </li>
                    <button className="login"
                    onClick={()=>{
                        if(btnName=="Login")
                            changeBtn("Logout");
                        else
                            changeBtn("Login");
                    }
                    }>{btnName}</button>
                    <li><FontAwesomeIcon icon={faCartShopping} className="icon"/></li>
                </ul>
            </div>
        </div>
        
    )
}

export default Header;