import React from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/user";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();



let counter = 0;
let recording = false;

class GameLetters extends React.Component
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

    componentDidUpdate = () =>
    {
        if(this.state.currentProblem === "" )
        {
            this.renderRandomProblem()
        }
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
    
    // GAME START/END
    handleOnStart = () =>
    {
        let word = [...document.querySelectorAll(".word-letters")];
        
        if(counter === word.length)
        {
            console.log("new problem");
            counter = 0;
            document.querySelector("#play").innerText = "PLAY";
            this.renderRandomProblem();
            this.reset();
            return null;
        }

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

        // ALIGN SPEECH RECOGNITION TO RENDER LETTERS INSTEAD OF WORDS
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
            else if(voiceResult === "WHY")
            {
                voiceResult = "Y"
            }
            else if(voiceResult === "AR")
            {
                voiceResult = "R"
            }
            else if(voiceResult === "SEE")
            {
                voiceResult = "C"
            }
            else if(voiceResult === "SEA")
            {
                voiceResult = "C"
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

            // HANDLE RESULT BASED ON USER INPUT
            if(word[counter].innerText === voiceResult)
            {
                word[counter].style.color = "green";
                this.props.updateUser("letters_score");
                if(counter < word.length)
                {
                    counter += 1;
                    if(recording === false)
                    {
                        this.handleOnStart();
                    }

                    if(counter === word.length)
                    {
                    document.querySelector("#play").innerText = "NEW";
                    }
                }
            }
            else
            {
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

                if(counter === word.length)
                {
                    document.querySelector("#play").innerText = "NEW";
                }
            }
        }

        }

//  RECORDING START/END
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

    reset = () =>
    {
        let array = document.querySelectorAll(".word-letters");
        array.forEach(letter => {
            letter.style.color = "black";
            letter.style.fontSize = "2em";
        })
    }


    renderWord = (word) =>
    {
        let arr = word.split("")
        return arr.map((letter, idx) => <p className="word-letters" key={idx}>{letter.toUpperCase()}</p>)
    }

    render()
    {
        if(this.state.currentProblem !== "")
        {
            return (
                <div id="math-game">
                    <h1 id="letters-title">Spell the word!</h1>
                    <h2>SPELLING</h2>
                    <h2 style={{marginBottom: "5%"}}>Scores: <span style={{color: "green"}}>{this.props.user.letters_score}</span> Mistakes: <span style={{color: "red"}}>{this.props.user.letters_mistakes}</span></h2>
    
                    <div id="letters-problem-container">
                        <img src={this.state.currentProblem.url} className="game-img"></img>
                        <div id="game-word-container">{this.renderWord(this.state.currentProblem.problem)}</div>
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

export default connect(({user}) => {return {user}}, { updateUser })(GameLetters);