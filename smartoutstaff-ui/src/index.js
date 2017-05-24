import 'babel-polyfill';

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Perf from 'react-addons-perf';

import 'normalize.css';

import Routes from 'components/Routes';

import configureStore from 'store';
import { setLocaleData, detectUserLocale } from 'i18n';

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
                {Routes}
            </Router>
        </Provider>,
        document.getElementById('app'));
};

setLocaleData(detectUserLocale()).then(() => renderApp());
