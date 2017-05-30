import { SEND_EMAIL_RESET_PASSWORD, GET_INFO_RESET_PASSWORD, SEND_NEW_PASSWORD } from 'actions/actionTypes';
import { CALL_API } from 'middleware/api';

const API_PREFIX = process.env.NODE_ENV === 'development' ? 'http://localhost:8090/rp' : '/rp';

export const sendEmailResetPassword = email => dispatch => (
    dispatch({
        email,
        [CALL_API]: {
            type: SEND_EMAIL_RESET_PASSWORD,
            endpoint: `${API_PREFIX}/otp`,
            body: { username: email },
            method: 'post',
        },
    })
);

export const sendNewPassword = (password, otp) => dispatch => (
    dispatch({
        password,
        [CALL_API]: {
            type: SEND_NEW_PASSWORD,
            endpoint: `${API_PREFIX}/passwd?otp=${otp}`,
            body: { password },
            method: 'post',
        },
    })
);

export const getInfoResetPassword = otp => dispatch => (
    dispatch({
        [CALL_API]: {
            type: GET_INFO_RESET_PASSWORD,
            endpoint: `${API_PREFIX}/password?otp=${otp}`,
            method: 'get',
        },
    })
);
