import React from "react";
import Math from "../images/math.png"
import Words from "../images/words.png"
import Letters from "../images/letters.png"


class Categories extends React.Component
{
    render()
    {
        return (
            <div id="categories">
                <p>Select category!</p>
                <div id="words-category">
                    <img></img>
                    <p></p>
                </div>

                <div id="math-category">
                    <img></img>
                    <p></p>
                </div>

                <div id="letters-category">
                    <img></img>
                    <p></p>
                </div>
            </div>
        )
    }
}

export default Categories;