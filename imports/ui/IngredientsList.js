import React from 'react';
import { Recipes } from '../api/recipes';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import IngredientsListItem from './IngredientsListItem'
import FlipMove from 'react-flip-move';
export class IngredientsList extends React.Component {
    constructor(props) {
        super(props);
    }
    onSubmit(e) {
        const title = this.refs.title.value;
        const quantity = this.refs.quantity.value;
        Meteor.call('recipes.addIngredient', this.props._id, { title, quantity })
        this.refs.quantity.value = "";
        this.refs.title.value = ""
    }
    render() {
        return (
            <div className="editor__ingredients">
                <div className="editor__list">
                    {this.props.ingredients.length === 0 ? (<div className="editor__ingredient-list__item-empty">
                        <p className="empty-item">No Ingredients. Add one to get started</p>
                    </div>): this.props.ingredients.map(ingredient => {
                        return <IngredientsListItem key={ingredient._id} recipe={ingredient} recipeId={this.props._id}/>
                    })}
                </div>
                <div className="ingredients__inputs">
                    <input
                        type="text"
                        ref="title"
                        placeholder="Name..."
                    ></input>
                    <input
                        type="text"
                        ref="quantity"
                        placeholder="Quantity..."
                    ></input>
                    <div>
                        <button className="button button-hover" onClick={this.onSubmit.bind(this)}>Add Ingredient</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default createContainer(() => {
    return {
        Session
    }
}, IngredientsList)
