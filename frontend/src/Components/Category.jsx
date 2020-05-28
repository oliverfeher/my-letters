import React from "react";

const Category = (props) =>
{
    return (
        <div className="category-container">
            <img src={props.imageSrc} className="category-img"/>
            <p>{props.categoryName}</p>
        </div>
    )
}

export default Category;