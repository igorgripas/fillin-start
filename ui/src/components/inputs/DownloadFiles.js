import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import FileRow from 'components/inputs/FileRow';

import { formatFileSize } from 'utils/formatterUtils';

export default class DownloadFiles extends Component {
    static propTypes = {
        showEmpty: PropTypes.bool,
        title: PropTypes.string,
        files: ImmutablePropTypes.list,
        onEditList: PropTypes.func,
        onDeleteFile: PropTypes.func,
        onDownloadFile: PropTypes.func.isRequired,
    };

    render() {
        if ((!this.props.files || !this.props.files.size) && !this.props.showEmpty) {
            return null;
        }
        return (
            <div className="content__row">
                <div className="content__label">
                    {this.props.title}
                </div>
                <ul className="download__list">
                    {
                        this.props.onEditList &&
                            <li className="download__edit">
                                <div className="btn-round-small" onClick={this.props.onEditList}>
                                    <i className="icon-edit" />
                                </div>
                            </li>
                    }
                    {
                        this.props.files.map(item =>
                            <FileRow
                                key={item.get('file_id')}
                                fileId={item.get('file_id')}
                                fileName={`${item.get('original_name')}`}
                                fileSize={`${formatFileSize(item.get('size_kb'))}`}
                                onClickDownloadFile={this.props.onDownloadFile}
                                onClickDelete={this.props.onDeleteFile}
                            />,
                        )
                    }
                </ul>
            </div>
        );
    }
}
