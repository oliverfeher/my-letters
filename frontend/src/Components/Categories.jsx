import React from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import Math from "../images/math.png";
import Words from "../images/words.png";
import Letters from "../images/letters.png";


class Categories extends React.Component
{

    handleSelection = () =>
    {
        this.props.history.push("/game/letters");
    }

    handleSelectionMath = () =>
    {
        this.props.history.push("/game/math");
    }

    handleSelectionWords = () =>
    {
        this.props.history.push("/game/words");
    }

    render()
    {
        return (
            <div id="category-section">
                <h1>Select category!</h1>
                <div id="categories">
                    <Category categoryName="WORDS" imageSrc={Words} handleSelection={this.handleSelectionWords}/>
                    <Category categoryName="MATH" imageSrc={Math} handleSelection={this.handleSelectionMath}/>
                    <Category categoryName="LETTERS" imageSrc={Letters} handleSelection={this.handleSelection}/>
                </div>
                <Link to={"/"} className="back-button">BACK</Link>
            </div>
        )
    }
}

export default Categories;