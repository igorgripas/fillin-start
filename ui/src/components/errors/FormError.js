import React from 'react';
import PropTypes from 'prop-types';

const FormError = props => (
    <div className="center__content-error e2eError" key={props.error} >
        <i className="icon-error" />
        {props.error}
    </div>
);

FormError.propTypes = {
    error: PropTypes.string.isRequired,
};

export default FormError;
