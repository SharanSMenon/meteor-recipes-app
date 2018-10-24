import {
    Mongo
} from 'meteor/mongo';
import {
    Meteor
} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment'
import { ObjectID } from 'mongodb'
export const Recipes = new Mongo.Collection('recipes');

if (Meteor.isServer) {
    Meteor.publish('recipes', function() {
        return Recipes.find({userId: this.userId})
    })
}

Meteor.methods({
    'recipes.insert'() {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized')
        }
        return Recipes.insert({
            title:'',
            description:'',
            steps:[],
            ingredients:[],
            updatedAt: moment().valueOf(),
            time:'',
            imgUrl:'',
            userId:this.userId
        })
    },
    'recipes.remove'(_id) {
        if (!this.userId){
            throw new Meteor.Error('not-authorized');
        }
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({
            _id
        })
        Recipes.remove({
            _id,
            userId:this.userId
        })

    },
    'recipes.update'(_id, updates) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized')
        }

        Recipes.update({
            _id,
            userId: this.userId
        }, {
            $set: {
                updatedAt: moment().valueOf(),
                ...updates
            }
        })
    },
    'recipes.addIngredient'(_id, ingredient){
        if (!this.userId) {
            throw new Meteor.Error('not-authorized')
        }
        const x = new ObjectID();
        const ingredientPush = {
            _id: x.toHexString(),
            ...ingredient
        }
        Recipes.update({
            userId:this.userId,
            _id
        }, {
            $push: {
                ingredients: ingredientPush
            }
        })
    },
    'recipes.removeIngredient'(_id, ingredientId){
        if (!this.userId) {
            throw new Meteor.Error('not-authorized')
        }

        Recipes.update({
            userId:this.userId,
            _id
        }, {
            $pull:{
                ingredients: {
                    _id: ingredientId
                }
            }
        })
    },
    'recipes.addStep'(_id, step) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized')
        }
        const x = new ObjectID();
        const stepPush = {
            _id: x.toHexString(),
            ...step
        }
        Recipes.update({
            userId:this.userId,
            _id
        }, {
            $push: {
                steps: stepPush
            }
        })
    },
    'recipes.removeStep'(_id, stepId) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized')
        }

        Recipes.update({
            userId:this.userId,
            _id
        }, {
            $pull:{
                steps: {
                    _id: stepId
                }
            }
        })
    }
})