import React from 'react';
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
const PublicHeader = (props) => {
    return (
        <div className="header">
            <div className="header__content">
                <h1>{props.title}</h1>
                <button className="button button--header" onClick={() => {
                    browserHistory.push('/')
                }}>Home</button>
            </div>
        </div>
    )
}

PublicHeader.propTypes = {
    title: PropTypes.string.isRequired
}
export default PublicHeader;

