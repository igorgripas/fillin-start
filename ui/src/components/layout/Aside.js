import React from 'react';
import PropTypes from 'prop-types';

const Aside = props => (
    <div className="aside">
        <div className="aside__wrapper">
            <h2>{props.title}</h2>
            {props.children}
        </div>
    </div>
);

Aside.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
};

export default Aside;
