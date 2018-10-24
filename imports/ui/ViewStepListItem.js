import React from 'react';
import { Meteor } from 'meteor/meteor';
import Remarkable from 'remarkable';
export default (props) => {
    const step = props.step;
    const md = new Remarkable('full', {
        html: false,
        xhtmlOut: false,
        breaks: false,
        langPrefix: 'language-',
        linkify: true,
        linkTarget: '',
        typographer: false,
        quotes: '“”‘’'
    })
    return (
        <div className="editor__step-list__item">
            <div className="step-item" dangerouslySetInnerHTML={{__html:md.render(step.step)}}>
            </div>
        </div>
    )
}