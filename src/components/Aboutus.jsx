import { useState } from "react";
import "../aboutUs.css";
import Profile from "./Profile";
import ProfileClass from "./ProfileClass";
const AboutUs = () => {
    const [showUser, setShowUser] = useState(false);
    return (
        <div className="about-container">
            <div className="show-profile">
                {
                <button className="user-btn" onClick={() => setShowUser(!showUser)}>
                    {showUser ? "Hide User" : "Show User"}
                </button>
                }
                {showUser && <Profile name={"JOE GOLDBERG"} location={"XYZ"}/>}
                {showUser && <ProfileClass name={"JOE GOLDBERG"} location={"XYZ"}/>}
            </div>
            <div className="about">
                <div className="about-left">
                    <h1>
                        Welcome to <br /> The world of <br />{" "}
                        <span>Tasty & Fresh Food</span>
                    </h1>
                    <h4>
                        "Better you will feel if you eat a Tasty<span>Trails</span> healthy
                        meal"
                    </h4>
                    </div>
                    <div className="about-right">
                    <img src="https://www.google.com/imgres?q=burger%20king&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fc%2Fcc%2FBurger_King_2020.svg%2F1200px-Burger_King_2020.svg.png&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBurger_King&docid=psPC_K3N_pw2bM&tbnid=FAruLF2FxitgiM&vet=12ahUKEwj53rP-gKuOAxVzSGwGHT6sAiUQM3oECB4QAA..i&w=1200&h=1308&hcb=2&ved=2ahUKEwj53rP-gKuOAxVzSGwGHT6sAiUQM3oECB4QAA" alt="Food Image" />
                </div>
            </div>
        </div>
    );
};

export default AboutUs;