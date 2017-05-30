import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';

import { MOBILE_MODE } from 'data';

import Logo from 'components/layout/Logo';
import HeaderLogo from 'components/layout/HeaderLogo';
import Breadcrumbs from 'react-breadcrumbs';
import MessagesContainer from 'containers/MessagesContainer';

const LoggedInLayout = props => (
    <div>
        <div className="wrapper">
            <MessagesContainer />
            <header className="header">
                <div className="container-fluid">
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-3 header__logo-holder">
                        <div className="header__logo">
                            <Link to="/">
                                <HeaderLogo />
                            </Link>
                        </div>
                    </div>
                    {
                        props.screenMode === MOBILE_MODE ?
                            <div className="nav__mob text-center" />
                            :
                            <div className="col-lg-5 col-md-5 col-sm-5 hidden-xs">
                                <div className="nav" />
                            </div>
                    }
                </div>
            </header>
            <div className="container-fluid">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <Breadcrumbs
                        routes={props.routes}
                        params={{ requestViewType: props.requestViewType }}
                        some={{ bar: 'foo' }}
                    />
                </div>
            </div>
            <div className="container-fluid content__holder">
                { props.children }
            </div>
        </div>
        <footer className="footer">
            <div className="container-fluid">
                <div className=" col-lg-1 col-md-1 col-sm-2 col-xs-3 footer__logo">
                    <Logo />
                </div>
                <div className="footer__copyright">© {new Date().getFullYear()} {l('Smart Solutions')}</div>
            </div>
        </footer>
    </div>
);

LoggedInLayout.propTypes = {
    children: PropTypes.node,
    screenMode: PropTypes.string.isRequired,
    routes: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    requestViewType: PropTypes.string, // eslint-disable-line
};

export default LoggedInLayout;
