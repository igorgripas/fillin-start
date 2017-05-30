import React from 'react';
import PropTypes from 'prop-types';

const PopupHolder = props => (
    <div className="popup__holder active">
        <div className="container-fluid">
            <div className="col-lg-3 col-md-3 col-sm-3 col-sm-offset-1">
                <div className="popup__wrapper">
                    <button className="popup__close close" onClick={props.onClose}>
                        <i className="icon-exit" />
                    </button>
                    <h2>{props.title}</h2>
                    {props.children}
                </div>
            </div>
        </div>
    </div>
);

PopupHolder.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default PopupHolder;
