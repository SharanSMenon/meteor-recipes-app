import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'
import {routes, onAuthChange} from './../imports/routes/routes'
import { Session } from 'meteor/session'
import { browserHistory } from 'react-router';


import './../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
    const currentPagePrivacy = Session.get('currentPagePrivacy')
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
    const selectedRecipeId =  Session.get('selectedRecipeId');
    if (selectedRecipeId) {
        browserHistory.replace(`/dashboard/${selectedRecipeId}`)
    }
})

Tracker.autorun(() => {
    const viewingRecipeId = Session.get('viewingRecipeId');
    if (viewingRecipeId) {
        browserHistory.replace(`/view/${viewingRecipeId}`)
    }
})
Tracker.autorun(() => {
    const isNavOpen = Session.get('isNavOpen');
    document.body.classList.toggle('is-nav-open', isNavOpen);
})

Meteor.startup(() => {
    Session.set('selectedRecipeId', undefined)
    Session.set('isNavOpen', false);
    Session.set('viewingRecipeId',undefined)
    const app = document.getElementById('app');
    ReactDOM.render(routes, app)
})