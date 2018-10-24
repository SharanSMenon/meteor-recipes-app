import React from 'react';
import PropTypes from 'prop-types'

const PublicHeader = (props) => {
    return (
        <div className="header">
            <div className="header__content">
                <h1>{props.title}</h1>
            </div>
        </div>
    )
}

PublicHeader.propTypes = {
    title: PropTypes.string.isRequired
}
export default PublicHeader;

