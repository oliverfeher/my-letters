import React from "react";
import "../stylesheets/App.css"
import Logo from "../images/film.png";
import HeadPhones from "../images/party.png"

class App extends React.Component
{
    render()
    {
        return (
            <div id="main-container">
                <div id="title-container">
                    <img src={Logo} id="minion-logo"/>
                    <div id="title-text-container">
                        <p style={{fontSize: "7em"}}>Hey <span style={{marginLeft: "4.5%", color: "#FFC107"}}>Kids!</span></p>
                        <img src={HeadPhones} id="headphones"/>
                        <p style={{marginLeft: "10%", fontSize: "1.2em"}}>© 2020 - myLetters - All Rights Reserved</p>
                    </div>
                </div>
                <button id="play">PLAY</button>
            </div>
        )
    }
}

export default App;