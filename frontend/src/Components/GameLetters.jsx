import React from "react";
import { Link } from "react-router-dom";
import WaterMelon from "../images/watermelon.png";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/user";
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
            word[counter].style.fontSize = "3em";
            document.querySelector("#play").innerText = "NEXT";
        }
        else if (word[counter - 1].style.color === "red" || word[counter - 1].style.color === "green")
        {
            this.spellCheck();
            word[counter].style.fontSize = "3em";
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
                this.props.updateUser("letters_score");
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
                this.props.updateUser("letters_mistake");
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
            <div id="math-game">
                <h1 id="letters-title">Spell the word!</h1>
                <h2>SPELLING</h2>
                <h2 style={{marginBottom: "5%"}}>Scores: <span style={{color: "green"}}>{this.props.user.letters_score}</span> Mistakes: <span style={{color: "red"}}>{this.props.user.letters_mistakes}</span></h2>

                <div id="letters-problem-container">
                    <img src={WaterMelon} className="game-img"></img>
                    <div id="game-word-container">{this.renderWord("watermelon")}</div>
                </div>
                <p id="play" onClick={this.handleOnStart}>PLAY</p>
                <Link to={"/categories"} className="back-button">EXIT</Link>
            </div>
        )
    }
}

export default connect(({user}) => {return {user}}, { updateUser })(GameLetters);