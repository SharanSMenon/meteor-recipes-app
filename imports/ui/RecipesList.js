import React from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Recipes } from '../api/recipes';
import RecipeListHeader from './RecipeListHeader';
import RecipeListItem from './RecipesListItem';
import RecipeListEmptyItem from './RecipesListEmptyItem';

export class RecipeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: ''
        }
        this.onFilterChange = this.onFilterChange.bind(this)
    }
    onFilterChange(e) {
        this.setState({
            filters: e.target.value
        })
    }
    render() {
        const recipes = this.props.recipes.filter(recipe => recipe.title.toLowerCase().includes(this.state.filters.toLowerCase()));
        return (
            <div className="item-list">
                <RecipeListHeader />
                <div className="item-list__input">
                    <input 
                        type="text" 
                        placeholder="Search..."
                        value={this.state.filters}
                        onChange={this.onFilterChange.bind(this)}
                        />
                </div>
                {recipes.length == 0 ? <RecipeListEmptyItem /> : undefined}
                <FlipMove>
                    {recipes.map(recipe => (<RecipeListItem recipe={recipe} key={recipe._id} />))}
                </FlipMove>
            </div>
        )
    }
}

RecipeList.propTypes = {
    recipes: PropTypes.array.isRequired
}

export default createContainer(() => {
    const selectedRecipeId = Session.get('selectedRecipeId')
    Meteor.subscribe('recipes');
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