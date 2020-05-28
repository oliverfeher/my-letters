import React from "react";
import WaterMelon from "../images/watermelon.png";
import Apple from "../images/fruit.png"
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();



let counter = 0;
let recording = false;

class Game extends React.Component
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
            if(word[counter].innerText === voiceResult)
            {
                console.log(voiceResult)
                console.log("correct");
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
                console.log("incorrect")
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
        }, 1000);
        recognition.onend = function() { recording = false}
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
                <img src={Apple}></img>
                <div id="game-word-container">{this.renderWord("apple")}</div>
                <p id="play" onClick={this.handleOnStart}>PLAY</p>
            </div>
        )
    }
}

export default Game;