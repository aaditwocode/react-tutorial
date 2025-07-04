import logo from "../../image1.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import {useState,useEffect} from "react";
const Header = () => {
    const [btnName,changeBtn]=useState("Login");
    return (
        <div className="header">
            <div className="logo-container">
                <img src="https://c8.alamy.com/comp/RKYBE3/restaurant-menu-food-logo-icon-vector-concept-flat-design-RKYBE3.jpg "/>
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <button className="login"
                    onClick={()=>{
                        if(btnName=="Login")
                            changeBtn("Logout");
                        else
                            changeBtn("Login");
                    }
                    }>{btnName}</button>
                    <li><FontAwesomeIcon icon={faCartShopping} /></li>
                </ul>
            </div>
        </div>
        
    )
}

export default Header;