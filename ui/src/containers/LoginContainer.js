import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { login } from 'actions/session';
import { getErrors, getInvalidatedFields, getIsLoggedIn } from 'selectors/session';
import { getNextLocation, getState } from 'selectors/routing';
import { validateCredentials } from 'validators/credentialsValidator';

import submitForm from 'hoc/submitForm';

import Login from 'components/Login';
import CredentialsWrapper from 'components/layout/CredentialsWrapper';

const mapStateToProps = state => ({
    errors: getErrors(state),
    isLoggedIn: getIsLoggedIn(state),
    invalidatedFields: getInvalidatedFields(state),
    nextLocation: getNextLocation(state),
    st: getState(state),
});

@connect(mapStateToProps, { login, replace })
@submitForm((value, props) => props.login(value.email, value.password), validateCredentials)
export default class LoginContainer extends PureComponent {
    static propTypes = {
        errors: PropTypes.arrayOf(PropTypes.string),
        invalidatedFields: PropTypes.objectOf(PropTypes.bool), // eslint-disable-line
        isLoggedIn: PropTypes.bool, // eslint-disable-line
        replace: PropTypes.func,
        onSubmit: PropTypes.func.isRequired,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn) {
            this.redirectAuthentificatedUser(nextProps);
        }
    }

    redirectAuthentificatedUser = (props) => {
        if (props.nextLocation) {
            this.props.replace(props.nextLocation);
        }
    };

    render() {
        const { errors, invalidatedFields, onSubmit } = this.props;
        return (
            <CredentialsWrapper>
                <Login
                    errors={errors || []}
                    invalidatedFields={invalidatedFields || {}}
                    onSubmit={onSubmit}
                />
            </CredentialsWrapper>
        );
    }
}
