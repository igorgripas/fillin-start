import { combineReducers } from 'redux-immutable';

import routing from 'reducers/routing';
import session from 'reducers/session';
import settings from 'reducers/settings';
import messages from 'reducers/messages';

export default combineReducers({
    routing,
    session,
    settings,
    messages,
});
