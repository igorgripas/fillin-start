import * as ActionTypes from 'actions/actionTypes';
import { CALL_API } from 'middleware/api';
import fileDownload from 'react-file-download';

export const deleteFile = (fileId, id) => ({
    type: ActionTypes.DELETE_FILE,
    fileId,
    id,
});

export const deleteTmpFile = (fileId, id) => dispatch => (
    dispatch({
        fileId,
        id,
        [CALL_API]: {
            type: ActionTypes.DELETE_TMP_FILE,
            endpoint: `/docs/tmp_file/${fileId}`,
            method: 'delete',
        },
    })
);

export const uploadTmpFile = (id, file) => (dispatch) => {
    const body = new FormData();
    body.set('file', file);

    return dispatch({
        id,
        [CALL_API]: {
            type: ActionTypes.UPLOAD_TMP_FILE,
            endpoint: '/docs/tmp_file',
            method: 'post',
            body,
        },
    });
};

export const downloadFile = (userId, fileId, fileName) => dispatch => (
    dispatch({
        [CALL_API]: {
            type: ActionTypes.DOWNLOAD_FILE,
            endpoint: `/docs/users/${userId}/files/${fileId}`,
            responseType: 'blob',
            formatter: response => fileDownload(response.data, fileName),
        },
    })
);

export const clearUploaderFiles = () => ({
    type: ActionTypes.CLEAR_UPLOADER_FILES,
});
