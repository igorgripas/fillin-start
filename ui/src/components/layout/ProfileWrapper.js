import React from 'react';
import PropTypes from 'prop-types';

import AsideProfile from 'components/profile/AsideProfile';

import { DESKTOP_MODE } from 'data';

const ProfileWrapper = props => (
    <div className="content">
        <div className="col-lg-3 col-md-3 col-sm-3">
            <h1>
                {props.title}
                <button className="content__back" onClick={props.onGoBack}>
                    <i className="icon-back" />
                    {
                        props.isOwn ?
                            l('Вернуться назад')
                            :
                            l('Вернуться в список пользователей')
                    }
                </button>
            </h1>
            {
                props.screenMode !== DESKTOP_MODE &&
                <AsideProfile
                    isOwn={props.isOwn}
                    screenMode={props.screenMode}
                    activeTab={props.activeTab}
                    onClick={props.onChangeTab}
                />
            }
            <div className="content__wrapper">
                {props.children}
            </div>
        </div>
    </div>
);

ProfileWrapper.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    isOwn: PropTypes.bool.isRequired,
    screenMode: PropTypes.string.isRequired,
    activeTab: PropTypes.string.isRequired,
    onChangeTab: PropTypes.func.isRequired,
    onGoBack: PropTypes.func.isRequired,
};

export default ProfileWrapper;
