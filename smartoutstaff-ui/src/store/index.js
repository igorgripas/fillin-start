import { fromJS } from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from 'reducers';

const devtools = (process.env.NODE_ENV === 'development' && window.devToolsExtension) || (() => noop => noop);

export default function configureStore(history) {
    const middlewares = [
        routerMiddleware(history),
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
        devtools(),
    ];

    const store = createStore(
        rootReducer,
        fromJS({}),
        compose(...enhancers),
    );

    return store;
}
