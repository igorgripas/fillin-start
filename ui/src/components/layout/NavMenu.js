import React from 'react';
import PropTypes from 'prop-types';

const NavMenu = props => (
    <ul className="nav__menu">
        {props.children}
    </ul>
);

NavMenu.propTypes = {
    children: PropTypes.node.isRequired,
};

export default NavMenu;
