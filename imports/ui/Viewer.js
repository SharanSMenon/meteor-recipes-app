import React from 'react'
import { Meteor } from 'meteor/meteor';
import PublicHeader from './PublicHeader'
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import ViewStepListItem from './ViewStepListItem';
import ViewIngListItem from './ViewIngListItem';
import Remarkable from 'remarkable';
import { Accounts } from 'meteor/accounts-base';

export class Viewer extends React.Component {
    constructor(props) {
        super(props);
        this.md = new Remarkable('full', {
            html: false,
            xhtmlOut: false,
            breaks: false,
            langPrefix: 'language-',
            linkify: true,
            linkTarget: '',
            typographer: false,
            quotes: '“”‘’'
        })
    }
    render() {
        const recipeId = Session.get('viewingRecipeId')
        const recipe = this.props.recipe;
        if (recipe) {
            return (
                <div>
                    <PublicHeader title="Recipes Viewer"/>
                    <div className="page-content">
                        <div className="viewer-content">
                            <h1 className="viewer__title">{recipe.title}</h1>
                            <div className="underline"></div>
                            <h2 className="viewer__subtitle">Time</h2>
                            <p>{recipe.time}</p>
                            <hr />
                            <h2 className="viewer__subtitle">Description</h2>
                            <div className="box" dangerouslySetInnerHTML={{__html:this.md.render(recipe.description)}}></div>
                            <h2 className="viewer__subtitle">Ingredients</h2>
                            {recipe.ingredients.map((ing) => {
                                return <ViewIngListItem key={ing._id} recipe={ing} />
                            })}
                            <hr />
                            <h2 className="viewer__subtitle">Steps</h2>
                            {recipe.steps.map((step) => {
                                return <ViewStepListItem key={step._id} step={step} />
                            })}
                            <hr />
                            {Accounts.userId() == recipe.userId ? "Share this link with your friends!": undefined}
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
    return {
        recipe: Session.get('recipeViewed')
    }
}, Viewer)