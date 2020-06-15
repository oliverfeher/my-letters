import React from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/user";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();



class GameMath extends React.Component
{
    
    state = {
        problems: [],
        currentProblem: ""
    };
    
    componentDidMount = () =>
    {
        axios.get("http://localhost:3001/api/game/math-problems")
        .then(resp => 
            this.setState({problems: resp.data.problems}))
    }

    componentDidUpdate = () =>
    {
        if(this.state.currentProblem === "" )
        {
            this.renderRandomProblem()
        }
    }

    // GENERATE RANDOM NUMBER FROM 0 TO THE LENGTH OF THE PROBLEMS STATE
    getRandomNumber = () =>
    {
        return Math.floor(Math.random() * this.state.problems.length) + 0 
    }

    // RESET GAME STYLING TO DEFAULT
    reset = () =>
    {
        document.querySelector("#solution").innerText = "??";
        document.querySelector("#result").innerText = "RESULT";
        document.querySelector("#result").style.color = "black";
        document.querySelector("#math-problem-container").style.borderColor = "black";
    }

    // RENDER RANDOM PROBLEM FROM STATE
    renderRandomProblem = () =>
    {
        this.setState({currentProblem: this.state.problems[this.getRandomNumber()]})
    }

    // START GAME
    handleOnStart = () =>
    {

        let result = document.querySelector("#result");
        let solution = document.querySelector("#solution");
        let container = document.querySelector("#math-problem-container");

        this.spellCheck();

        recognition.onresult = (event) => {
            let voiceResult = parseInt(event.results[0][0].transcript);
            

            if(voiceResult === this.state.currentProblem.solution)
            {
                solution.innerText = voiceResult;
                result.innerText = "Correct!"
                result.style.color = "green";
                container.style.borderColor = "green";
                setTimeout(() => this.reset(), 1000);
                this.props.updateUser("math_score");
                setTimeout(()=>this.renderRandomProblem(), 1000);
            }
            else
            {
                solution.innerText = voiceResult;
                result.innerText = "Incorrect!"
                result.style.color = "red";
                container.style.borderColor = "red";
                this.props.updateUser("math_mistake")
            }
        }
    }

    // RECORDING START/END
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
        if(this.state.currentProblem !== "")
        {
            return (
                <div id="math-game">
                    <h1 id="math-title">Solve the problem!</h1>
                    <h2>MATH</h2>
                    <h2 style={{marginBottom: "5%"}}>Scores: <span style={{color: "green"}}>{this.props.user.math_score}</span> Mistakes: <span style={{color: "red"}}>{this.props.user.math_mistakes}</span></h2>
                    <div id="math-problem-container">
                        <h2 id="math-problem">{this.state.currentProblem.problem} = <span id="solution">??</span></h2>
                        <p id="result">RESULT</p>
                    </div>
                    <p id="play" onClick={this.handleOnStart}>PLAY</p>
                    <Link to={"/categories"} className="back-button">EXIT</Link>
                </div>
            )
        }
        else
        {
            return <div>LOADING</div>
        }
    }
}

export default connect(({user}) => {return {user}}, { updateUser })(GameMath);