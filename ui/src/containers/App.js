import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getScreenMode } from 'selectors/settings';

import { setScreenMode } from 'actions/settings';

import { MOBILE_MODE, TABLET_MODE, DESKTOP_MODE } from 'data';

const mapStateToProps = state => ({
    screenMode: getScreenMode(state),
});

@connect(mapStateToProps, { setScreenMode })
export default class App extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        screenMode: PropTypes.string.isRequired,
        setScreenMode: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensionsIfChanged);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensionsIfChanged);
    }

    calculateScreenMode() {
        if (!window) {
            return DESKTOP_MODE;
        }
        if (window.innerWidth < 768) {
            return MOBILE_MODE;
        } else if (window.innerWidth < 1024) {
            return TABLET_MODE;
        }
        return DESKTOP_MODE;
    }

    updateDimensions = () => {
        this.props.setScreenMode(this.calculateScreenMode());
    };

    updateDimensionsIfChanged = () => {
        if (this.props.screenMode !== this.calculateScreenMode()) {
            this.updateDimensions();
        }
    };

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
