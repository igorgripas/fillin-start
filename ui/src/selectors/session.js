export const getSession = state => state.get('session');

export const getErrors = state => state.getIn(['session', 'errors']);

export const getInvalidatedFields = state => state.getIn(['session', 'invalidatedFields']);

export const getAppToken = state => state.getIn(['session', 'appToken']);

export const getUserLocale = state => state.getIn(['session', 'appToken', 'locale_key']);

export const getIsLoggedIn = state => state.getIn(['session', 'isLoggedIn']);

export const getFullName = state => state.getIn(['session', 'appToken', 'full_name']);

export const getUserId = state => state.getIn(['session', 'appToken', 'user_id']);

export const getXsrfToken = state => state.getIn(['session', 'appToken', 'xsrf_token']);
