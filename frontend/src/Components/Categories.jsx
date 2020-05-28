import React from "react";
import Category from "./Category";
import Math from "../images/math.png";
import Words from "../images/words.png";
import Letters from "../images/letters.png";


class Categories extends React.Component
{
    render()
    {
        return (
            <div id="categories">
                <p>Select category!</p>
                <Category categoryName="words" imageSrc={Words} />
                <Category categoryName="math" imageSrc={Math} />
                <Category categoryName="letters" imageSrc={Letters} />
            </div>
        )
    }
}

export default Categories;