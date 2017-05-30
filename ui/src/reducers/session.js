import { fromJS } from 'immutable';
import {
    successAction,
    failAction,
    startAction,
    LOGIN,
    LOGOUT,
    UNAUTHORIZED,
    RESTORE_AUTH,
} from 'actions/actionTypes';

const defaultState = fromJS({ isLoggingIn: false, isLoggedIn: false });

export default function session(state = defaultState, action) {
    switch (action.type) {
        case startAction(LOGIN):
            return fromJS({
                isLoggingIn: true,
                isLoggedIn: false,
            });
        case successAction(LOGIN): {
            return fromJS({
                isLoggingIn: false,
                isLoggedIn: true,
                appToken: action.response.data,
            });
        }
        case RESTORE_AUTH: {
            return fromJS({
                isLoggingIn: false,
                isLoggedIn: true,
                appToken: JSON.parse(action.appToken),
            });
        }
        case successAction(LOGOUT):
        case UNAUTHORIZED: {
            let newState = fromJS({
                isLoggingIn: false,
                isLoggedIn: false,
            });

            if (state.get('isLoggingIn')) {
                const errors = fromJS([l('Неверное имя пользователя или пароль')]);
                const invalidatedFields = fromJS({
                    email: true,
                    password: true,
                });
                newState = newState
                    .set('errors', errors)
                    .set('invalidatedFields', invalidatedFields);
            }
            return newState;
        }
        case failAction(LOGIN): {
            let errors = [l('Что-то пошло не так. Попробуйте снова')];
            if (action.error && action.error.message) {
                errors = [action.error.message];
            }
            return fromJS({
                isLoggingIn: false,
                isLoggedIn: false,
                errors,
            });
        }
        default:
            return state;
    }
}
