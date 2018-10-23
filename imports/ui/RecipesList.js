import React from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Recipes } from '../api/recipes';
import RecipeListHeader from './RecipeListHeader';

export class RecipeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: ''
        }
        this.onFilterChange = this.onFilterChange.bind(this)
    }
    onFilterChange(e) {
        console.log(e)
    }
    render() {
        const recipes = this.props.recipes;
        console.log(recipes)
        return (
            <div className="item-list">
                <RecipeListHeader />
                {recipes.map(recipe => <p key={recipe._id}>{recipe.title}</p>)}
            </div>
        )
    }
}

RecipeList.propTypes = {
    recipes: PropTypes.array.isRequired
}

export default createContainer(() => {
    const selectedRecipeId = Session.get('selectedRecipeId')
    Meteor.subscribe('notes');

    return {
        recipes: Recipes.find({}, {
            sort: {
                updatedAt: -1
            }
        }).fetch().map((recipe) => {
            return {
                ...recipe,
                selected: (selectedRecipeId === recipe._id)
            }
        }),
    }
}, RecipeList)