import { CALL_API } from 'middleware/api';
import { wrapperMultipart } from 'utils/multipartUtils';

export const GET_REQUESTS = 'GET_REQUESTS';
export const CANCEL_REQUEST = 'CANCEL_REQUEST';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const CREATE_CERTIFICATE = 'CREATE_CERTIFICATE';
export const UPDATE_CERTIFICATE = 'UPDATE_CERTIFICATE';
export const APPROVE_CERTIFICATE = 'APPROVE_CERTIFICATE';
export const PROCESS_CERTIFICATE = 'PROCESS_CERTIFICATE';
export const REJECT_CERTIFICATE = 'REJECT_CERTIFICATE';
export const GET_CERTIFICATE = 'GET_CERTIFICATE';
export const CLEAR_CURRENT_REQUEST = 'CLEAR_CURRENT_REQUEST';

export const readRequests = (limit, offset, params) => dispatch => (
    dispatch({
        params: { limit, offset, ...params },
        [CALL_API]: {
            type: GET_REQUESTS,
            endpoint: '/api/requests',
            params: { limit, offset, ...params },
            method: 'get',
        },
    })
);

export const getCertificate = id => dispatch => (
    dispatch({
        [CALL_API]: {
            type: GET_CERTIFICATE,
            endpoint: `/api/certificate_requests/${id}`,
            method: 'get',
        },
    })
);

export const cancelRequest = requestId => dispatch => (
    dispatch({
        requestId,
        [CALL_API]: {
            type: CANCEL_REQUEST,
            endpoint: `/api/requests/${requestId}`,
            method: 'delete',
        },
    })
);

export const createCertificate = (certificate, fileIds) => dispatch => (
    dispatch({
        certificate,
        fileIds,
        [CALL_API]: {
            type: CREATE_CERTIFICATE,
            body: wrapperMultipart({ request: certificate, example_new_files: fileIds }),
            endpoint: '/api/certificate_request',
            method: 'post',
        },
    })
);

export const updateCertificate = (certificate, newFileIds, deletedFileIds) => dispatch => (
    dispatch({
        certificate,
        newFileIds,
        deletedFileIds,
        [CALL_API]: {
            type: UPDATE_CERTIFICATE,
            body: wrapperMultipart({
                request: certificate,
                example_new_files: newFileIds,
                example_deleted_files: deletedFileIds,
            }),
            endpoint: `/api/certificate_requests/${certificate.request_id}`,
            method: 'put',
        },
    })
);

export const approveCertificate = (certificateId, comment) => dispatch => (
    dispatch({
        certificateId,
        comment,
        [CALL_API]: {
            type: APPROVE_CERTIFICATE,
            body: {
                text: comment,
            },
            endpoint: `/api/certificate_requests/${certificateId}/approval`,
            method: 'post',
        },
    })
);

export const processCertificate = (certificateId, comment, newFileIds) => dispatch => (
    dispatch({
        certificateId,
        comment,
        [CALL_API]: {
            type: PROCESS_CERTIFICATE,
            body: wrapperMultipart({
                comment: { text: comment },
                certificate_new_files: newFileIds,
            }),
            endpoint: `/api/certificate_requests/${certificateId}/response`,
            method: 'post',
        },
    })
);


export const rejectCertificate = (certificateId, comment) => dispatch => (
    dispatch({
        certificateId,
        comment,
        [CALL_API]: {
            type: REJECT_CERTIFICATE,
            body: ({
                text: comment,
            }),
            endpoint: `/api/certificate_requests/${certificateId}/rejection`,
            method: 'post',
        },
    })
);

export const updateRequest = request => ({
    type: UPDATE_REQUEST,
    request,
});

export const deleteRequest = requestId => ({
    type: DELETE_REQUEST,
    requestId,
});

export const clearCurrentRequest = () => ({
    type: CLEAR_CURRENT_REQUEST,
});
