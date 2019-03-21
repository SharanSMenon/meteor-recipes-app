import React from 'react';
import { Meteor } from 'meteor/meteor';
import Remarkable from 'remarkable';
export default (props) => {
    const step = props.step;
    const md = new Remarkable('full', {
        html: false,
        xhtmlOut: false,
        breaks: false,
        langPrefix: 'language-',
        linkify: true,
        linkTarget: '',
        typographer: false,
        quotes: '“”‘’'
    })
    return (
        <div className="editor__step-list__item">
            <div className="step-item" dangerouslySetInnerHTML={{__html:step.step}}>
            </div>
            <div className="step-item-buttons">
                {/* <button className="button">Edit Step</button> */}
                <button onClick={() => {
                    Meteor.call('recipes.removeStep',props.recipeId, step._id)
                }} className="button button-danger">Remove</button>
                {/* <button className="button button-hover">
                    Edit
                </button> */}
            </div>
        </div>
    )
}