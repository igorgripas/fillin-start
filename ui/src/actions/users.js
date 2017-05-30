import moment from 'moment';
import * as ActionTypes from 'actions/actionTypes';
import { CALL_API } from 'middleware/api';
import { DEFAULT_FORMAT, DATE_FORMAT } from 'utils/formatterUtils';
import settings from 'settings';

const LIMIT = settings.tableEntitiesLimit;

export const sendRequestProfile = userId => dispatch => (
    dispatch({
        [CALL_API]: {
            type: ActionTypes.GET_PROFILE,
            endpoint: `/api/users/${userId}`,
            formatter: (response) => {
                if (response.data.passport && response.data.passport.passport_issue_date) {
                    response.data.passport.passport_issue_date = moment(
                        response.data.passport.passport_issue_date,
                        DEFAULT_FORMAT,
                    ).format(DATE_FORMAT);
                }
                return response;
            },
        },
    })
);

export const updateProfile = (userId, profile) => dispatch => (
    dispatch({
        [CALL_API]: {
            type: ActionTypes.UPDATE_PROFILE,
            endpoint: `/api/users/${userId}`,
            method: 'put',
            body: profile,
        },
    })
);

export const saveNewPassword = (userId, password) => dispatch => (
    dispatch({
        [CALL_API]: {
            type: ActionTypes.CHANGE_PASSWORD,
            method: 'put',
            endpoint: `/api/users/${userId}/password_changing`,
            body: { plain_password: password },
        },
    })
);

export const requestUsers = (params, offset = 0, limit = LIMIT) => dispatch => (
    dispatch({
        offset,
        [CALL_API]: {
            type: ActionTypes.GET_USERS,
            method: 'get',
            endpoint: '/api/users',
            params: { ...params.toJS(), offset, limit },
        },
    })
);

export const changeUserStatus = (userId, blocked) => dispatch => (
    dispatch({
        userId,
        blocked,
        [CALL_API]: {
            type: ActionTypes.CHANGE_USER_STATUS,
            method: 'put',
            endpoint: `/api/users/${userId}/blocked`,
            body: { blocked },
        },
    })
);
