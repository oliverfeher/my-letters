import React from "react";
import { Link } from "react-router-dom";
import WaterMelon from "../images/watermelon.png";
import Apple from "../images/fruit.png"
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();



let counter = 0;
let recording = false;

class GameLetters extends React.Component
{
    handleOnStart = () =>
    {
        let word = [...document.querySelectorAll(".word-letters")];
        console.log(counter);
        if(counter === 0)
        {
            this.spellCheck();
            document.querySelector("#play").innerText = "NEXT"
        }
        else if (word[counter - 1].style.color === "red" || word[counter - 1].style.color === "green")
        {
            this.spellCheck();
        }

        recognition.onresult = (event) => {
            let voiceResult = event.results[0][0].transcript.toUpperCase()
            if(voiceResult === "OH")
            {
                voiceResult = "O"
            }
            else if(voiceResult === "AL")
            {
                voiceResult = "L"
            }
            else if(voiceResult === "AR")
            {
                voiceResult = "R"
            }
            else if(voiceResult === "TEA")
            {
                voiceResult = "T"
            }
            else if(voiceResult === "END")
            {
                voiceResult = "N"
            }
            else if(voiceResult === "AND")
            {
                voiceResult = "N"
            }
            if(word[counter].innerText === voiceResult)
            {
                console.log(voiceResult)
                word[counter].style.color = "green";
                if(counter < word.length)
                {
                    counter += 1;
                    if(recording === false)
                    {
                        this.handleOnStart();
                    }
                }
            }
            else
            {
                console.log(voiceResult)
                word[counter].style.color = "red";
                if(counter < word.length)
                {
                    counter += 1;
                    if(recording === false)
                    {
                        this.handleOnStart();
                    }
                }
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

    renderWord = (word) =>
    {
        let arr = word.split("")
        return arr.map(letter => <p className="word-letters">{letter.toUpperCase()}</p>)
    }

    render()
    {
        return (
            <div id="game">
                <img src={WaterMelon} className="game-img"></img>
                <div id="game-word-container">{this.renderWord("watermelon")}</div>
                <p id="play" onClick={this.handleOnStart}>PLAY</p>
                <Link to={"/categories"} className="back-button">EXIT</Link>
            </div>
        )
    }
}

export default GameLetters;