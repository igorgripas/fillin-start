import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import DownloadFilesContainer from 'containers/DownloadFilesContainer';

const UploaderFiles = props => (
    <div>
        <DownloadFilesContainer
            title={props.title}
            userId={props.userId}
            files={props.files}
            onDeleteFile={props.onDeleteFile}
        />
        <div className="content__row">
            <div className="content__label">{props.titleDropZone}</div>
            <Dropzone
                multiple
                className="upload"
                maxSize={props.maxFilesSize}
                accept={props.acceptedFiles}
                onDrop={props.onUploadFile}
                onDropRejected={props.onDropRejected}
            >
                <i className="icon-combined-shape" />
                <div>
                    {l('Нажмите чтобы добавить файлы или перетащите их сюда.')}
                </div>
            </Dropzone>
        </div>
    </div>
);

UploaderFiles.propTypes = {
    title: PropTypes.string,
    titleDropZone: PropTypes.string,
    acceptedFiles: PropTypes.string,
    maxFilesSize: PropTypes.number,
    userId: PropTypes.PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    files: ImmutablePropTypes.list.isRequired,
    onDropRejected: PropTypes.func,
    onDeleteFile: PropTypes.func.isRequired,
    onUploadFile: PropTypes.func.isRequired,
};

export default UploaderFiles;
