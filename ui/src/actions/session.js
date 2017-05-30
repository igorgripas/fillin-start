import * as ActionTypes from 'actions/actionTypes';
import { CALL_API } from 'middleware/api';

export const login = (email, password) => dispatch => (
    dispatch({
        email,
        [CALL_API]: {
            type: ActionTypes.LOGIN,
            endpoint: '/api/session/credentials',
            body: { email, password },
            method: 'post',
        },
    })
);

export const logout = () => dispatch => (
    dispatch({
        [CALL_API]: {
            type: ActionTypes.LOGOUT,
            endpoint: '/api/session',
            method: 'delete',
        },
    })
);

export const restoreAuth = appToken => (
    {
        type: ActionTypes.RESTORE_AUTH,
        appToken,
    }
);
