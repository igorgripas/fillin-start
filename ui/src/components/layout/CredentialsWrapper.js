import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Logo from 'components/layout/Logo';

import bitmap from 'assets/img/bitmap.png';

/* eslint-disable */
const CredentialsWrapper = props => (
    <div>
        <Helmet>
            <body className="auth" />
        </Helmet>
        <div className="wrapper">
            <div className="center__logo-company">
                <Logo />
            </div>

            <div className="center__logo-page">
                <img src={bitmap} alt="" />
            </div>
            {props.children}
        </div>
        <footer className="footer footer-alt">
            © {new Date().getFullYear()} {l('Smart Solutions')}
        </footer>
    </div>
);
/* eslint-enable */

CredentialsWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CredentialsWrapper;
