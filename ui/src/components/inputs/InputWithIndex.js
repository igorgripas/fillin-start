import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputWithIndex extends Component {
    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        index: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        onChange: PropTypes.func.isRequired,
    };

    handleChange = (e) => {
        this.props.onChange(this.props.index, e.target.value);
    };

    render() {
        return (
            <input
                type="text"
                maxLength={100}
                className="full-width"
                value={this.props.value}
                onChange={this.handleChange}
            />
        );
    }
}
