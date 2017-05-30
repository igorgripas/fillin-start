import React from 'react';
import PropTypes from 'prop-types';

const SortHolder = props => (
    <div className="sort__holder">
        {props.children}
    </div>
);

SortHolder.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SortHolder;
