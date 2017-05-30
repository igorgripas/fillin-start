import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { NOTIFICATION } from 'data';

const Messages = (props) => {
    if (!props.message.get('text')) {
        return null;
    }
    if (props.message.get('type') === NOTIFICATION) {
        return (
            <div className="warning__wrapper">
                <div className="e2eMessage notification">
                    {props.message.get('text')}
                </div>
            </div>
        );
    }
    return (
        <div className="warning__wrapper">
            <div className="e2eWarning warning__item">
                <i className="icon-warning" />
                <span className="warning__error">{props.message.get('error')}</span>
                <span className="warning__text">{props.message.get('text')}</span>
            </div>
        </div>
    );
};

Messages.propTypes = {
    message: ImmutablePropTypes.map,
};

export default Messages;
