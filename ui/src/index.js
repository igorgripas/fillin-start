import 'babel-polyfill';

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Perf from 'react-addons-perf';

import 'normalize.css';
import 'assets/style/main.less';

import getRoutes from 'components/Routes';

import configureStore from 'store';
import { setLocaleData, detectUserLocale } from 'i18n';
import { extractSession } from 'utils/session';
import { restoreAuth } from 'actions/session';
import { getUserLocale } from 'selectors/session';

window.Perf = Perf;

const store = configureStore(browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState(state) {
        return state.get('routing').toJS();
    },
});

const renderApp = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                {getRoutes()}
            </Router>
        </Provider>,
        document.getElementById('app'));
};

const startApp = () => {
    const session = extractSession();

    if (session) {
        store.dispatch(restoreAuth(session));
        const locale = getUserLocale(store.getState());
        setLocaleData(detectUserLocale(locale)).then(() => renderApp());
    } else {
        setLocaleData(detectUserLocale()).then(() => renderApp());
    }
};

startApp();
