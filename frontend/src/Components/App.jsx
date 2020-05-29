import React from "react";
import "../stylesheets/App.css"
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import GameLetters from "./GameLetters";
import Categories from "./Categories";
import GameMath from "./GameMath";

class App extends React.Component
{
    render()
    {
        return (
            <BrowserRouter>
                <Route path="/" exact component={Home}/>
                <Route path="/categories" exact component={Categories}/>
                <Route path="/game/letters" exact component={GameLetters}/>
                <Route path="/game/math" exact component={GameMath}/>

            </BrowserRouter>
        )
    }
}

export default App;