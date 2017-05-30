import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class SwitchingButton extends PureComponent {
    static propTypes = {
        isActive: PropTypes.bool.isRequired,
        mode: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    handleClick = () => {
        this.props.onClick(this.props.mode);
    };

    render() {
        return (
            <button
                className={`btn e2e${this.props.mode} ${cx({ 'btn-empty': this.props.isActive })}`}
                onClick={this.handleClick}
            >
                {this.props.children}
            </button>
        );
    }
}
