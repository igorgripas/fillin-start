import React from 'react';
/* eslint-disable react/prop-types */
export default WrappedComponent => (props) => {
    if (props.children) {
        return props.children;
    }
    return (<WrappedComponent {...props} />);
};
/* eslint-enable react/prop-types */
