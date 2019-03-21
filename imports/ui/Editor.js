import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router'
import Modal from 'react-modal'
import { Recipes } from '../api/recipes';
import IngredientList from './IngredientsList';
import StepsList from './StepsList'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill';
export class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            time: '',
            description: '',
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
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.onDeleteRecipe = this.onDeleteRecipe.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
    }
    handleTimeChange(e) {
        const time = e.target.value;
        this.setState({ time })
        this.props.call('recipes.update', this.props.recipe._id, { time })
    }
    handleDescriptionChange(e) {
        const description = e
        this.setState({ description })
        this.props.call('recipes.update', this.props.recipe._id, { description });
    }
    handleTitleChange(e) {
        const title = e.target.value;
        this.setState({ title })
        this.props.call('recipes.update', this.props.recipe._id, { title })
    }
    componentDidUpdate(prevProps) {
        const currentRecipeId = this.props.recipe ? this.props.recipe._id : undefined;
        const prevRecipesId = prevProps.recipe ? prevProps.recipe._id : undefined;

        if (currentRecipeId && currentRecipeId !== prevRecipesId) {
            this.setState({
                title: this.props.recipe.title,
                description: this.props.recipe.description,
                time: this.props.recipe.time
            });
        };
    }
    handleModalClose() {
        this.setState({ modalIsOpen: false })
    }
    onDeleteRecipe() {
        this.props.call('recipes.remove', this.props.recipe._id)
        this.props.browserHistory.push("/dashboard")
        Session.set('isNavOpen', true)
        this.handleModalClose()
    }
    render() {
        if (this.props.recipe) {
            return (
                <div className="editor">
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        contentLabel="Add Link"
                        ariaHideApp={false}
                        onRequestClose={this.handleModalClose}
                        shouldCloseOnEsc={true}
                        shouldCloseOnOverlayClick={true}
                        className="boxed-view__box"
                        overlayClassName="boxed-view boxed-view--modal"
                    >
                        <h1>Confirm</h1>
                        <p>Are you sure that you want to delete</p>
                        <form onSubmit={(e) => e.preventDefault()} className="boxed-view__form">
                            <button ref="delete" className="button button-danger" onClick={this.onDeleteRecipe}>Delete</button>
                            <br />
                            <button className="button button--secondary" onClick={this.handleModalClose} type="button ">Cancel</button>
                        </form>
                    </Modal>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            value={this.state.title}
                            placeholder="Untitled Recipe"
                            onChange={this.handleTitleChange}
                            className="editor__title"
                        />
                        <br />
                        <h2>Time:</h2>
                        <input
                            value={this.state.time}
                            placeholder="Time it takes..."
                            onChange={this.handleTimeChange}
                            type="text"
                            className="editor__time"
                        />
                        <hr></hr>
                        <h2>Description:</h2>
                        <ReactQuill 
                            theme="snow"
                            value={this.state.description || ''}
                            onChange={this.handleDescriptionChange}
                            modules={this.state.modules}
                        />
                        <hr></hr>
                        <h2>Ingredients</h2>
                        <IngredientList ingredients={this.props.recipe.ingredients} _id={this.props.recipe._id}/>
                        <hr></hr>
                        <h2>Steps</h2>
                        <StepsList steps={this.props.recipe.steps} _id={this.props.recipe._id}/>
                        <hr />
                        <br />
                        <div>
                            <button onClick={() => {
                                this.props.browserHistory.push(`/view/${this.props.recipe._id}`)
                            }}
                            className="button button-hover">
                                Preview Recipe
                            </button>
                            <br />
                            <button onClick={() => {
                                this.setState({ modalIsOpen:true })
                            }}
                                className="button button-danger">Delete Recipe</button>
                        </div>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="editor">
                    <p className="editor__message">{(this.props.selectedRecipeId) ? "Recipe not found" : "Pick or create a recipe to get started."}</p>
                </div>
            )
        }
    }
}
Editor.propTypes = {
    recipe: PropTypes.object,
    selectedRecipeId: PropTypes.string,
    call: PropTypes.func.isRequired,
    browserHistory: PropTypes.object.isRequired
}

// Default Export
export default createContainer(() => {
    const selectedRecipeId = Session.get('selectedRecipeId');
    return {
        selectedRecipeId,
        recipe: Recipes.findOne(selectedRecipeId),
        call: Meteor.call,
        browserHistory
    }
}, Editor);