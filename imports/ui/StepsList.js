import React from 'react';
import { Recipes } from '../api/recipes';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import StepsListItem from './StepsListItem';

export class StepsList extends React.Component {
    constructor(props) {
        super(props)   
    }

    onSubmit(e) {
        const step = this.refs.step.value;
        Meteor.call('recipes.addStep', this.props._id, { step })
        this.refs.step.value = "";

    }
    render() {
        return (
            <div className="editor__steps">
                <div className="editor__list">
                    <ol>
                        {this.props.steps.map(step => {
                            return <StepsListItem key={step._id} step={step} recipeId={this.props._id}/>
                        })}
                    </ol>
                </div>
                <div className="steps__inputs">
                    <textarea
                        type="text"
                        ref="step"
                        placeholder="Enter step here..."
                        className="editor__desc"
                    ></textarea>
                    <div>
                        <button className="button button-hover" onClick={this.onSubmit.bind(this)}>Add step</button>
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
}, StepsList)