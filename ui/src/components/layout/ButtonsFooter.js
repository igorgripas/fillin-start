import React from 'react';
import PropTypes from 'prop-types';

const ButtonsFooter = props => (
    <div className="content__row">
        <div className="content__buttons">
            {
                props.onCancelEdit &&
                <button className="btn btn-alt e2eCancel" disabled={props.disableCancel} onClick={props.onCancelEdit}>
                    {l('Отменить')}
                </button>
            }
            {
                props.onClickSaveProfile &&
                <button className="btn btn-def e2eSave" disabled={props.disableSave} onClick={props.onClickSaveProfile}>
                    {l('Сохранить')}
                </button>
            }
        </div>
    </div>
);

ButtonsFooter.propTypes = {
    disableSave: PropTypes.bool,
    disableCancel: PropTypes.bool,
    onCancelEdit: PropTypes.func,
    onClickSaveProfile: PropTypes.func,
};

export default ButtonsFooter;
