import React from 'react';
import { createContainer } from 'meteor/react-meteor-data'
import moment from 'moment';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';

export const RecipeListItem = (props) => {
    const className = props.recipe.selected ? "item item--selected": "item";
    return (
        <div className={className} onClick={() => {
            props.Session.set('selectedRecipeId', props.recipe._id)
            props.Session.set('isNavOpen', false)
        }}>
            <h5 className="item__title">{props.recipe.title || 'Untitled Recipe'}</h5>
            <p className="item__subtitle">Time: {props.recipe.time || 'None'}</p>
        </div>
    )
}

RecipeListItem.propTypes = {
    recipe: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
}

export default createContainer(() => {
    return {
        Session
    }
}, RecipeListItem)

