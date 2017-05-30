import { fromJS } from 'immutable';
import { SET_SCREEN_MODE } from 'actions/actionTypes';
import { DESKTOP_MODE } from 'data';

const defaultState = {
    currentScreenMode: DESKTOP_MODE,
};

export default function settings(state = fromJS(defaultState), action) {
    switch (action.type) {
        case SET_SCREEN_MODE:
            return state.set('currentScreenMode', action.view);
        default:
            return state;
    }
}
