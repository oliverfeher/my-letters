import React from "react";
import "../stylesheets/App.css"
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import Categories from "./Categories";

class App extends React.Component
{
    render()
    {
        return (
            <BrowserRouter>
                <Route path="/" exact component={Home}/>
                <Route path="/categories" exact component={Categories}/>
                <Route path="/game" exact component={Game}/>

            </BrowserRouter>
        )
    }
}

export default App;