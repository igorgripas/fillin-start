import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { getIsLoggedIn } from 'selectors/session';
import { getPathname, getQuery } from 'selectors/routing';

const mapStateToProps = state => ({
    isLoggedIn: getIsLoggedIn(state),
    pathname: getPathname(state),
    query: getQuery(state),
});

export default function requireAuth(Component) {
    @connect(mapStateToProps, { replace })
    class AuthentificatedComponent extends React.Component {

        static propTypes = {
            isLoggedIn: PropTypes.bool,
        };

        componentWillMount() {
            this.checkAuth(this.props);
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps);
        }

        checkAuth = (props) => {
            if (!props.isLoggedIn) {
                props.replace({
                    pathname: '/login',
                    state: {
                        nextLocation: {
                            pathname: props.pathname,
                            query: props.query,
                        },
                    },
                });
            }
        };

        render() {
            const { isLoggedIn, ...otherProps } = this.props;

            return isLoggedIn
                ? <Component {...otherProps} />
                : null;
        }
    }

    return AuthentificatedComponent;
}
