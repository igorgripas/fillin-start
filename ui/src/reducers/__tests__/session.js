import { expect } from 'chai';
import { Map, List } from 'immutable';

import reducer from '../../reducers/session';

import {
    successAction,
    failAction,
    startAction,
    LOGIN,
    UNAUTHORIZED,
    RESTORE_AUTH,
} from 'actions/actionTypes';

global.l = str => str;

describe('session reducer', () => {
    it('should return initial state', () => {
        const state = reducer(undefined, {});

        expect(state).to.be.an.instanceof(Map);
        expect(state.get('isLoggingIn')).to.be.equal(false);
        expect(state.get('isLoggedIn')).to.be.equal(false);
    });

    it('should start login', () => {
        const state = reducer(undefined, { type: startAction(LOGIN) });

        expect(state).to.be.an.instanceof(Map);
        expect(state.get('isLoggingIn')).to.be.equal(true);
        expect(state.get('isLoggedIn')).to.be.equal(false);
    });

    it('should start login', () => {
        const state = reducer(undefined, { type: startAction(LOGIN) });

        expect(state).to.be.an.instanceof(Map);
        expect(state.get('isLoggingIn')).to.be.equal(true);
        expect(state.get('isLoggedIn')).to.be.equal(false);
    });

    it('should successfully login', () => {
        let state = reducer(undefined, { type: startAction(LOGIN) });
        state = reducer(state, { type: successAction(LOGIN), response: { data: { userId: 100 } } });

        expect(state).to.be.an.instanceof(Map);
        expect(state.get('isLoggingIn')).to.be.equal(false);
        expect(state.get('isLoggedIn')).to.be.equal(true);
        expect(state.getIn(['appToken', 'userId'])).to.be.equal(100);
    });

    it('should set errors login', () => {
        let state = reducer(undefined, { type: startAction(LOGIN) });
        state = reducer(state, { type: UNAUTHORIZED });

        expect(state).to.be.an.instanceof(Map);
        expect(state.get('isLoggingIn')).to.be.equal(false);
        expect(state.get('isLoggedIn')).to.be.equal(false);
        expect(state.get('errors')).to.be.an.instanceof(List);
        expect(state.get('errors').size).to.be.equal(1);
        expect(state.get('errors').first()).to.be.equal('Неверное имя пользователя или пароль');
        expect(state.get('invalidatedFields')).to.be.an.instanceof(Map);
        expect(state.getIn(['invalidatedFields', 'email'])).to.be.equal(true);
        expect(state.getIn(['invalidatedFields', 'password'])).to.be.equal(true);

        state = reducer(undefined, { type: UNAUTHORIZED });
        expect(state.get('isLoggingIn')).to.be.equal(false);
        expect(state.get('isLoggedIn')).to.be.equal(false);
        expect(state.get('errors')).to.be.undefined;

        state = reducer(undefined, { type: failAction(LOGIN) });

        expect(state.get('isLoggingIn')).to.be.equal(false);
        expect(state.get('isLoggedIn')).to.be.equal(false);
        expect(state.get('errors')).to.be.an.instanceof(List);
        expect(state.get('errors').size).to.be.equal(1);
        expect(state.get('errors').first()).to.be.equal('Что-то пошло не так. Попробуйте снова');
        expect(state.get('invalidatedFields')).to.be.undefined;

        state = reducer(undefined, { type: failAction(LOGIN), error: { message: 'Пользователь заблокирован' } });

        expect(state.get('isLoggingIn')).to.be.equal(false);
        expect(state.get('isLoggedIn')).to.be.equal(false);
        expect(state.get('errors')).to.be.an.instanceof(List);
        expect(state.get('errors').size).to.be.equal(1);
        expect(state.get('errors').first()).to.be.equal('Пользователь заблокирован');
        expect(state.get('invalidatedFields')).to.be.undefined;

    });

    it('should restore auth', () => {
        const state = reducer(undefined, { type: RESTORE_AUTH, appToken: JSON.stringify({ userId: 100 }) });

        expect(state).to.be.an.instanceof(Map);
        expect(state.get('isLoggingIn')).to.be.equal(false);
        expect(state.get('isLoggedIn')).to.be.equal(true);
        expect(state.getIn(['appToken', 'userId'])).to.be.equal(100);
    });
});