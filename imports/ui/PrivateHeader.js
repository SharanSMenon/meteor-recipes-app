import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';

const PrivateHeader = (props) => {
    const navImgSrc = props.isNavOpen ? "/images/x.svg" : "/images/bars.svg"
    return (
        <div className="header">
            <div className="header__content">
                <img src={navImgSrc} onClick={() => props.Session.set('isNavOpen', !props.Session.get('isNavOpen'))} className="header__nav-toggle"/>
                <h1>{props.title}</h1>
                <button onClick={() => Accounts.logout()} className="button button--header">Logout</button>
            </div>
        </div>
    )
}
PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired,
    isNavOpen:PropTypes.bool.isRequired
}
export default createContainer(() => {
    return {
        handleLogout: Accounts.logout,
        Session,
        isNavOpen: Session.get('isNavOpen')
    }
}, PrivateHeader);

