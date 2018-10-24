import React from 'react'
import { Meteor } from 'meteor/meteor';
import PublicHeader from './PublicHeader'
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Recipes } from '../api/recipes';
import ViewStepListItem from './ViewStepListItem';
import ViewIngListItem from './ViewIngListItem';
export class Viewer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const recipeId = Session.get('viewingRecipeId')
        const recipe = this.props.recipe;
        // console.log(recipe)
        if (recipe) {
            return (
                <div>
                    <PublicHeader title="Recipes Viewer"/>
                    <div className="page-content">
                        <div className="viewer-content">
                            <h1>{recipe.title}</h1>
                            <h2>Time</h2>
                            <p>{recipe.time}</p>
                            <h2>Description</h2>
                            <p>{recipe.description}</p>
                            <h2>Ingredients</h2>
                            {recipe.ingredients.map((ing) => {
                                return <ViewIngListItem key={ing._id} recipe={ing} />
                            })}
                            <h2>Steps</h2>
                            {recipe.steps.map((step) => {
                                return <ViewStepListItem key={step._id} step={step} />
                            })}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <PublicHeader title="Recipes Viewer"/>
                    <div className="page-content">
                        <p>Recipe Not Found. Please enter a valid ID</p>
                    </div>
                </div>
            )
        }
    }
}
export default createContainer(() => {
    var request = new Request(window.location.href);
    var rec;
    fetch(request).then(function(response) {
        Session.set('recipeViewed', JSON.parse(response.headers.get('x-recipe')))
      });
    // console.log(Session.get('recipeViewed'))
    return {
        recipe: Session.get('recipeViewed')
    }
}, Viewer)