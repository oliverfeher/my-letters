import React from "react";
import { Link } from "react-router-dom";
import WaterMelon from "../images/watermelon.png";
import Apple from "../images/fruit.png"
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();



let recording = false;

class GameWords extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            correct: false
        }
    }
    handleOnStart = () =>
    {   
        this.spellCheck();
        recognition.onresult = (event) => {
            let voiceResult = event.results[0][0].transcript.toUpperCase()
            if(voiceResult === "APPLE")
            {
                this.setState({
                    correct: true
                })
            }
        }

    }

    spellCheck = () =>
    {
        recording = true;
        recognition.start();
        console.log("recording")
        setTimeout(() => {
            recognition.stop();
        }, 2000);
        recognition.onend = function() { recording = false }
    }


    render()
    {
        return (
            <div id="game">
                <img src={Apple} className="game-img"></img>
                <div id="game-word-container">
                    {this.state.correct ? <p style={{color: "green"}}>Apple</p> : null}
                </div>
                <p id="play" onClick={this.handleOnStart}>PLAY</p>
                <Link to={"/categories"} className="back-button">EXIT</Link>
            </div>
        )
        
    }
}

export default GameWords;