import { connect } from 'react-redux';

import { getMessage } from 'selectors/messages';
import Messages from 'components/Messages';

const mapStateToProps = state => ({
    message: getMessage(state),
});

export default connect(mapStateToProps)(Messages);
