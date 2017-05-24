import React from 'react';
import { Route } from 'react-router';

import Main from 'containers/Main';
import App from 'containers/App';

const Routes = (
    <Route component={App} >
        <Route path="/" component={Main} />
    </Route>);

export default Routes;
