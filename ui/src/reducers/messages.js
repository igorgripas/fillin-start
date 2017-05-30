import { fromJS } from 'immutable';
import { SHOW_MESSAGE, HIDE_MESSAGE } from 'actions/messages';


const defaultState = {};

export default function messages(state = fromJS(defaultState), action) {
    switch (action.type) {
        case SHOW_MESSAGE: {
            return fromJS(action.message);
        }
        case HIDE_MESSAGE: {
            return fromJS(defaultState);
        }
        default:
            return state;
    }
}
