import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FileRow extends Component {
    static propTypes = {
        fileId: PropTypes.string.isRequired,
        fileName: PropTypes.string.isRequired,
        fileSize: PropTypes.string.isRequired,
        onClickDelete: PropTypes.func,
        onClickDownloadFile: PropTypes.func.isRequired,
    };

    handleClickDelete = () => {
        this.props.onClickDelete(this.props.fileId);
    };

    handleDownloadFile = () => {
        this.props.onClickDownloadFile(this.props.fileId);
    };

    render() {
        return (
            <li className="e2eDownloadFile">
                <i className="icon-file-icon-pdf" />
                <span
                    className="download__name e2eDownloadName"
                    onClick={this.handleDownloadFile}
                > {this.props.fileName} </span>
                {this.props.fileSize}
                {
                    this.props.onClickDelete &&
                    <button className="e2eDeleteFile" onClick={this.handleClickDelete}>
                        <i className="icon-exit" />
                    </button>
                }
            </li>
        );
    }
}
