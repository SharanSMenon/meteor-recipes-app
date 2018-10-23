import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'
import {routes, onAuthChange} from './../imports/routes/routes'
import { Session } from 'meteor/session'

import './../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
    const app = document.getElementById('app');
    ReactDOM.render(routes, app)
})