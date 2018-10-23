import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
// Components Files
import Signup from './../ui/Signup';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';
const unAuthPages = ['/', '/signup'];
const authPages = ['/dashboard'];
const onEnterRecipePage = (nextState) => {
    Session.set('selectedRecipeId', nextState.params.id)
};

const onLeaveRecipePage = () => {
    Session.set('selectedRecipeId', undefined)
}

const onEnterPublicPage = () => {
    if (Meteor.userId()){
        browserHistory.replace('/dashboard')
    }
}
const onEnterPrivatePage = () => {
    if (!Meteor.userId()){
        browserHistory.replace('/')
    }
}

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
    const isUnAuthPage = currentPagePrivacy === 'unauth';
    const isAuthPage = currentPagePrivacy === 'auth';
    if (isUnAuthPage && isAuthenticated) {
        browserHistory.replace('/dashboard')
    } else if (isAuthPage && !isAuthenticated) {
        browserHistory.replace('/')
    }
};

export const globalOnChange = (prevState, nextState) => {
    globalOnEnter(nextState);
}

export const globalOnEnter = (nextState) => {
    const lastRoute = nextState.routes[nextState.routes.length - 1];
    Session.set('currentPagePrivacy', lastRoute.privacy)
}
export const routes = (
    <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
        <Route path="/signup" component={Signup} privacy="unauth"/>
        <Route exact path="/" component={Login} privacy="unauth"/>
        <Route path="/dashboard" component={Dashboard} privacy="auth"/>
        <Route path="/dashboard/:id" component={Dashboard} onEnter={onEnterRecipePage} onLeave={onLeaveRecipePage}privacy="auth"/>
        <Route path="*" component={NotFound}/>
    </Route>
</Router>
);