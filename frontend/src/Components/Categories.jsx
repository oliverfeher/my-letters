import React from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import Math from "../images/math.png";
import Words from "../images/words.png";
import Letters from "../images/letters.png";
import { connect } from "react-redux";


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
        if(this.props.user.id)
        {
            return (
                <div id="category-section">
                    <h1>Select category!</h1>
                    <div id="categories">
                        <Category categoryName="WORDS" imageSrc={Words} handleSelection={this.handleSelectionWords}/>
                        <Category categoryName="MATH" imageSrc={Math} handleSelection={this.handleSelectionMath}/>
                        <Category categoryName="LETTERS" imageSrc={Letters} handleSelection={this.handleSelection}/>
                    </div>
                    <Link to={"/dashboard"} className="back-button">BACK</Link>
                </div>
            )
        }
        else
        {
            this.props.history.push("/login");
            return null;
        }
    }
}

export default connect(({user}) => {return {user}})(Categories);