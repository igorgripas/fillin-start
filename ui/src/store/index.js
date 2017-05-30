import { fromJS } from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import api from 'middleware/api';

import rootReducer from 'reducers';
import rootSaga from 'sagas';
import thunk from 'redux-thunk';

const devtools = (process.env.NODE_ENV === 'development' && window.devToolsExtension) || (() => noop => noop);

export default function configureStore(history) {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [
        thunk,
        api,
        sagaMiddleware,
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

    sagaMiddleware.run(rootSaga);

    return store;
}
