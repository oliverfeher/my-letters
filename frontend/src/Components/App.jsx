import React from "react";
import "../stylesheets/App.css"
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";

class App extends React.Component
{
    render()
    {
        return (
            <BrowserRouter>
                <Route path="/" exact component={Home}/>
                <Route path="/game" exact component={Game}/>

            </BrowserRouter>
        )
    }
}

export default App;