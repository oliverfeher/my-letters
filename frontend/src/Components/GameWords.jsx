import React from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/user";

import Apple from "../images/fruit.png"
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();



let recording = false;

class GameWords extends React.Component
{
    state = {
        problems: [],
        currentProblem: ""
    };

    componentDidMount = () =>
    {
        axios.get("http://localhost:3001/api/game/letters-problems")
        .then(resp => 
            this.setState({problems: resp.data.problems}))
    }

    getRandomNumber = () =>
    {
        let index = Math.floor(Math.random() * this.state.problems.length) + 0;
        console.log(index);
        return index; 
    }

    renderRandomProblem = () =>
    {
        this.setState({currentProblem: this.state.problems[this.getRandomNumber()]});
    }

    componentDidUpdate = () =>
    {
        if(this.state.currentProblem === "" )
        {
            this.renderRandomProblem()
        }
    }

    handleOnStart = () =>
    {   
        this.spellCheck();
        recognition.onresult = (event) => {
            let voiceResult = event.results[0][0].transcript.toUpperCase()
            if(voiceResult === this.state.currentProblem.problem.toUpperCase())
            {
               document.querySelector("#solution").innerHTML = `Correct! <br> ${voiceResult}`;
               document.querySelector("#solution").style.color = "green";
               this.props.updateUser("words_score");
               setTimeout(()=> {
                   document.querySelector("#solution").innerHTML = "SOLUTION";
                   document.querySelector("#solution").style.color = "black";
               }, 2000)
               setTimeout(()=>this.renderRandomProblem(), 2000);
            }
            else
            {
                document.querySelector("#solution").innerHTML = `Incorrect! <br> ${voiceResult}`;
                document.querySelector("#solution").style.color = "red";
                this.props.updateUser("words_mistake");
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
            <div id="math-game">
                <h1 id="letters-title">What is this?</h1>
                <h2>WORDS</h2>
                <h2 style={{marginBottom: "5%"}}>Scores: <span style={{color: "green"}}>{this.props.user.words_score}</span> Mistakes: <span style={{color: "red"}}>{this.props.user.words_mistakes}</span></h2>
                <div id="letters-problem-container">
                <img src={this.state.currentProblem.url} className="game-img"></img>
                <p id="solution" style={{fontSize: "2em"}}>SOLUTION</p>
                </div>
                <p id="play" onClick={this.handleOnStart}>PLAY</p>
                <Link to={"/categories"} className="back-button">EXIT</Link>
            </div>
        )
        
    }
}

export default connect(({user}) => {return {user}}, { updateUser })(GameWords);