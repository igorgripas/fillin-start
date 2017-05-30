import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default (submit, validation) => (WrappedComponent) => {
    class SubmitForm extends Component {
        static propTypes = {
            errors: ImmutablePropTypes.list,
            invalidatedFields: ImmutablePropTypes.map, // eslint-disable-line
        };

        constructor() {
            super();
            this.state = { errors: [], invalidatedFields: {} };
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps.errors !== this.props.errors) {
                const errors = (nextProps.errors && nextProps.errors.toJS()) || [];
                const invalidatedFields = (nextProps.invalidatedFields && nextProps.invalidatedFields.toJS()) || {};
                this.setState({
                    errors,
                    invalidatedFields,
                });
            }
        }

        handleSubmit = (value, callback = () => {}) => {
            const { errors = [], invalidatedFields = {} } = validation(value);
            this.setState({
                errors,
                invalidatedFields,
            });
            if (errors && errors.length) {
                return;
            }
            submit(value, this.props);
            callback();
        };

        clearErrors = () => {
            this.setState({ errors: [], invalidatedFields: {} });
        };

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    {...this.state}
                    clearErrors={this.clearErrors}
                    onSubmit={this.handleSubmit}
                />
            );
        }
    }

    return SubmitForm;
};
