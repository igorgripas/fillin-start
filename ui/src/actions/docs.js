import * as ActionTypes from 'actions/actionTypes';
import { CALL_API } from 'middleware/api';

import { wrapperMultipart } from 'utils/multipartUtils';

export const requestDocs = (userId, docTypeId, requestId) => dispatch => ( // eslint-disable-line
    dispatch({
        [CALL_API]: {
            type: ActionTypes.GET_DOCS,
            endpoint: `/docs/users/${userId}/doc_briefs`,
            params: { doc_type_id: docTypeId, request_id: requestId },
        },
    })
);

export const createDoc = (userId, doc, files) => dispatch => (
    dispatch({
        [CALL_API]: {
            type: ActionTypes.CREATE_DOC,
            endpoint: `/docs/users/${userId}/doc`,
            method: 'post',
            body: wrapperMultipart({
                doc_brief: doc.delete('files').toJS(),
                files: files.map(item => item.get('file_id')).toJS(),
            }),
        },
    })
);

export const updateDoc = (userId, docId, newFiles, deletedFiles) => dispatch => (
    dispatch({
        [CALL_API]: {
            type: ActionTypes.CREATE_DOC,
            endpoint: `/docs/users/${userId}/docs/${docId}`,
            method: 'put',
            body: wrapperMultipart({
                new_files: newFiles ? newFiles.map(item => item.get('file_id')).toJS() : null,
                deleted_files: deletedFiles ? deletedFiles.toJS() : null,
            }),
        },
    })
);

export const closePopupDocs = () => ({
    type: ActionTypes.CLOSE_POPUP_UPLOAD_DOCS,
});

export const openPopupDocs = doc => ({
    type: ActionTypes.OPEN_POPUP_UPLOAD_DOCS,
    data: doc,
});
