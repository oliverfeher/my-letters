import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/user";
import WaterMelon from "../images/watermelon.png";
import Apple from "../images/fruit.png"
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();




class GameMath extends React.Component
{
    handleOnStart = () =>
    {
        let result = document.querySelector("#result");
        let solution = document.querySelector("#solution");
        let container = document.querySelector("#math-problem-container");

        this.spellCheck();

        recognition.onresult = (event) => {
            let voiceResult = parseInt(event.results[0][0].transcript);
            

            if(voiceResult === 5)
            {
                console.log(voiceResult);
                solution.innerText = voiceResult;
                result.innerText = "Correct!"
                result.style.color = "green";
                container.style.borderColor = "green";
                this.props.updateUser("math_score")
            }
            else
            {
                solution.innerText = voiceResult;
                console.log(voiceResult)
                result.innerText = "Incorrect!"
                result.style.color = "red";
                container.style.borderColor = "red";
                this.props.updateUser("math_mistake")
            }
        }
    }

    spellCheck = () =>
    {
        recognition.start();
        console.log("recording")
        setTimeout(() => {
            recognition.stop();
        }, 2000);
    }


    render()
    {
        return (
            <div id="math-game">
                <h1 id="math-title">Solve the problem!</h1>
                <div id="math-problem-container">
                    <h2 id="math-problem">2 + 3 = <span id="solution">???</span></h2>
                    <p id="result">RESULT</p>
                </div>
                <p id="play" onClick={this.handleOnStart}>PLAY</p>
                <Link to={"/categories"} className="back-button">EXIT</Link>
            </div>
        )
    }
}

export default connect(({user}) => {return {user}}, { updateUser })(GameMath);