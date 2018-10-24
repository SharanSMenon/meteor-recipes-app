import React from 'react';
import { Meteor } from 'meteor/meteor';

export default (props) => {
    const ingredient = props.recipe;
    return (
        <div className="editor__ingredient-list__item">
            <div>
                <h5 className="item__title">{ingredient.title || 'No Title'}</h5>
                <p className="item__subtitle">Quantity: {ingredient.quantity || 'No quantity'}</p>
            </div>
        </div>
    )
}