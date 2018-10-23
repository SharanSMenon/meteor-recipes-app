import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types'
const PrivateHeader = (props) => {
    return (
        <div className="header">
            <div className="header__content">
                <h1>{props.title}</h1>
                <button onClick={() => Accounts.logout()} className="button button--header">Logout</button>
            </div>
        </div>
    )
}
PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
}
export default PrivateHeader;

