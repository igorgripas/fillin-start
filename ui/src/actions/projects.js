import { CALL_API } from 'middleware/api';

export const GET_PROJECTS = 'GET_PROJECTS';

export const readProjects = () => dispatch => (
    dispatch({
        [CALL_API]: {
            type: GET_PROJECTS,
            endpoint: '/api/projects',
            method: 'get',
        },
    })
);
