import { createSelector } from 'reselect';

export const getLocation = state => state.getIn(['routing', 'locationBeforeTransitions']);

export const getQuery = createSelector(
    getLocation,
    location => location && location.get('query'),
);

export const getPathname = createSelector(
    getLocation,
    location => location && location.get('pathname'),
);

export const getNextLocation = createSelector(
    getLocation,
    location => (location.get('state') && location.getIn(['state', 'nextLocation'])) || '/',
);

export const getState = createSelector(
    getLocation,
    location => location.get('state'),
);
