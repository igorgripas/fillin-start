import axios from 'axios';

import { getXsrfToken } from 'selectors/session';

import {
    startAction,
    successAction,
    failAction,
    UNAUTHORIZED,
    RESPONSE_ERROR,
    SEND_REQUEST,
} from 'actions/actionTypes';

const getApiPrefix = (endpoint) => {
    if (process.env.NODE_ENV !== 'development') {
        return endpoint;
    }
    if (/\/api\/.*/.test(endpoint)) {
        return `http://localhost:8099${endpoint}`;
    }
    return '';
};

const instance = axios.create({
    timeout: 5000,
    withCredentials: true,
});

export const callApi = (headers, method = 'get', endpoint, body, params, responseType = 'json') =>
    instance({ headers, url: getApiPrefix(endpoint), method, data: body, params, responseType });

export const CALL_API = Symbol('CALL_API');

const buildHeaders = (state) => {
    const token = getXsrfToken(state);
    const headers = {};
    if (token) {
        headers['X-XSRF-TOKEN'] = token;
    }
    return headers;
};

export default store => next => (action) => {
    const callAPI = action[CALL_API];

    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    let { endpoint } = callAPI;
    const { type, method = 'get', body = {}, params, formatter = response => response, responseType } = callAPI;

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }

    if (typeof type !== 'string') {
        throw new Error('Expected action type to be string.');
    }

    const actionWith = (data) => {
        const finalAction = {
            ...action,
            ...data,
        };

        delete finalAction[CALL_API];

        return finalAction;
    };

    store.dispatch(
        actionWith({
            type: startAction(type),
        }),
    );
    store.dispatch({ type: SEND_REQUEST });
    const headers = buildHeaders(store.getState());
    return callApi(headers, method, endpoint, body, params, responseType).then(
        response => store.dispatch(
            actionWith({
                response: formatter(response),
                type: successAction(type),
            }),
        ),
        (error) => {
            if (!error.response) {
                return store.dispatch(
                    actionWith({
                        type: failAction(type),
                        error: error.message || 'Error happened during API call',
                    }),
                );
            }
            console.log('error', error);
            if (error.response.status) {
                store.dispatch(
                    {
                        type: RESPONSE_ERROR,
                        response: error.response,
                    },
                );
            }
            if (error.response.status === 401) {
                return store.dispatch(
                    actionWith({
                        type: UNAUTHORIZED,
                        error: error.response.data,
                    }),
                );
            }
            return store.dispatch(
                actionWith({
                    type: failAction(type),
                    error: error.response.data || 'Error happened during API call',
                }),
            );
        },
    );
};
