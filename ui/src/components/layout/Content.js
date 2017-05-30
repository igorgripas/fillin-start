import React from 'react';
import PropTypes from 'prop-types';

const Content = props => (
    <div className="content">
        <h1 className="e2eTitle">{props.title}
            <button className="content__refresh" onClick={props.onRefresh}>
                <i className="icon-refresh" />
                {l('Обновить')}
            </button>
        </h1>
        {props.children}
    </div>
);

Content.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    onRefresh: PropTypes.func,
};

export default Content;
