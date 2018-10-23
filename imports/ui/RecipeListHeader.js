import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import { Recipes } from '../api/recipes';
import { Session } from 'meteor/session';

export const RecipeListHeader = (props) => {
    return (
        <div className="item-list__header">
            <button className="button button-hover" onClick={() => {
                Meteor.call('recipes.insert', (err, res) => {
                    if (res) {
                        props.Session.set('selectedRecipeId', res);
                        props.Session.set('isNavOpen', false)
                    }
                })
            }}>
                New Recipe
            </button>
        </div>
    )
}

RecipeListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired,
    Session: PropTypes.object.isRequired
}
export default createContainer(() => {
    return {
        meteorCall: Meteor.call,
        Session
    }
}, RecipeListHeader)
