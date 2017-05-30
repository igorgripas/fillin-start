import React from 'react';
import { Route, Redirect } from 'react-router';

import App from 'containers/App';
import LoggedInLayoutContainer from 'containers/LoggedInLayoutContainer';
import LoginContainer from 'containers/LoginContainer';
import Main from 'components/Main';

export const DEFAULT_PATH = '/main';

const Routes = () => (
    <Route component={App} >
        <Route path="/login" component={LoginContainer} />
        <Redirect from="/" to={DEFAULT_PATH} />
        <Route component={LoggedInLayoutContainer}>
            <Route
                name={l('Профиль')}
                path="main"
                component={(Main)}
            />
        </Route>
    </Route>
);

export default Routes;
