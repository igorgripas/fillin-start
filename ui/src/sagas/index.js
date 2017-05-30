import { fork, takeLatest, select } from 'redux-saga/effects';

import {
    successAction,
    LOGIN,
    LOGOUT,
    UNAUTHORIZED,
} from 'actions/actionTypes';

import { getAppToken } from 'selectors/session';
import { saveSession, clearSession } from 'utils/session';

function* saveSessionToken() {
    const token = yield select(getAppToken);
    saveSession(token);
}

function removeSessionToken() {
    clearSession();
}

function* watchLogin() {
    yield takeLatest(successAction(LOGIN), saveSessionToken);
}

function* watchUnauthorized() {
    yield takeLatest([UNAUTHORIZED, successAction(LOGOUT)], removeSessionToken);
}

export default function* root() {
    yield fork(watchLogin);
    yield fork(watchUnauthorized);
}
