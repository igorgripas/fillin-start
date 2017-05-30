import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import enhanceWithClickOutside from 'react-click-outside';

import { MOBILE_MODE } from 'data';

@enhanceWithClickOutside
export default class NavUser extends Component {
    static propTypes = {
        fullName: PropTypes.string.isRequired,
        screenMode: PropTypes.string.isRequired,
        logout: PropTypes.func.isRequired,
    };

    state = {
        isShow: false,
    };

    handleClick = () => {
        this.setState({ isShow: !this.state.isShow });
    };

    handleClickOutside = () => {
        this.setState({ isShow: false });
    };

    handleClickLogout = () => {
        this.props.logout();
    };

    /* eslint-disable */
    renderDropDownMenu() {
        return (
            <div className="tooltip top-right active">
                <div className="tooltip__wrapper">
                    <ul className="tooltip__menu">
                        <li className="e2eProfile" onClick={this.handleClick}>
                            <Link to="/profile">
                                <i className="icon-usericon-menu" />{l('Мой профиль')}
                            </Link>
                        </li>
                        <li onClick={this.handleClick}><a><i className="icon-settings-menu" />{l('Настройки')}</a></li>
                        <li onClick={this.handleClick}>
                            <a className="e2eLogout" onClick={this.handleClickLogout}>
                                <i className="icon-logout-menu" />{l('Выход')}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    renderNavBurger() {
        return (
            <div className="nav__burger">
                <button onClick={this.handleClick} onBlur={this.handleBlur}>
                    <i className="icon-menu-burger" />
                    {this.state.isShow && this.renderDropDownMenu()}
                </button>
            </div>
        );
    }

    renderNavUser() {
        return (
            <div className="nav__user" onClick={this.handleClick}>
                <div className="nav__user-img">
                    <i className="icon-usericon-menu" />
                </div>
                <div className="ya nav__user-name e2eUsername">
                    {this.props.fullName}
                </div>
                {this.state.isShow && this.renderDropDownMenu()}
                <i className="icon-arrow-small" />
            </div>
        );
    }

    render() {
        return this.props.screenMode === MOBILE_MODE ? this.renderNavBurger() : this.renderNavUser();
    }
    /* eslint-enable */
}
