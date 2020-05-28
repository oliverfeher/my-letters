import React from "react";
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    // document.querySelector("#test").innerText = event.results[0][0].transcript.toLowerCase();
    if(event.results[0][0].transcript.toLowerCase() === document.querySelector("#test").innerText)
    {
        document.querySelector("#test").style.color = "green";
    }
    else
    {
        document.querySelector("#test").style.color = "red";

    }
}

class App extends React.Component
{
    handleOnStart = () =>
    {
        recognition.start();
        console.log("started")

        setTimeout(() => {
            console.log("stopped")
            recognition.stop();
        }, 1500);
    }


    render()
    {
        return <div>
            <button onClick={this.handleOnStart}>start</button>
            <p id="test">test</p>
        </div>
    }
}

