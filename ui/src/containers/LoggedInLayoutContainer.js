import { connect } from 'react-redux';
import LoggedInLayout from 'components/layout/LoggedInLayout';
import requireAuth from 'hoc/requireAuth';
import { getScreenMode } from 'selectors/settings';

const mapStateToProps = state => ({
    screenMode: getScreenMode(state),
});

export default connect(mapStateToProps, {})(requireAuth(LoggedInLayout));
