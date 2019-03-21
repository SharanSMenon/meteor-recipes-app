import React from 'react';
import { Recipes } from '../api/recipes';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import StepsListItem from './StepsListItem';
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill';
export class StepsList extends React.Component {
    constructor(props) {
        super(props)   
        this.state = {
            step:"",
            modules:{
                toolbar:[
                    [{'header':[1,2,3,4]}], 
                    ['bold', 'italic', 'underline', 'strike'], 
                    [{'color':[]}, { 'background': [] }],
                    ['link', 'image'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'script': 'sub'}, { 'script': 'super' }],
                
                ]
            }
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    onChange(e){
        this.setState({step:e})
    }
    onSubmit(e) {
        const step = this.state.step;
        Meteor.call('recipes.addStep', this.props._id, { step })
        this.setState({step:""})

    }
    render() {
        return (
            <div className="editor__steps">
                <div className="editor__list">
                    <ol>
                        {this.props.steps.length === 0 ? (<div className="editor__ingredient-list__item-empty">
                            <p className="empty-item">No Steps. Add one to get started</p>
                    </div>): this.props.steps.map(step => {
                            return <StepsListItem key={step._id} step={step} recipeId={this.props._id}/>
                        })}
                    </ol>
                </div>
                <div className="steps__inputs">
                    <ReactQuill 
                        theme="snow"
                        value={this.state.step || ""}
                        onChange={this.onChange}
                        modules={this.state.modules}
                        style={{
                            marginBottom:"2rem",
                        }}
                    />
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