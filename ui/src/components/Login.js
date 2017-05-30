import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import cx from 'classnames';

import FormError from 'components/errors/FormError';

export default class Login extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func,
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    handleSubmitForm = (e) => {
        e.preventDefault();
        const email = (this.state && this.state.email) || '';
        const password = (this.state && this.state.password) || '';
        this.props.onSubmit({ email, password });
    };

    /* eslint-disable */
    render() {
        const { errors, invalidatedFields } = this.props;
        return (
            <form onSubmit={this.handleSubmitForm}>
                        <div className="center__content-wrap">
                            <div className="center__title">
                                {l('Войти на сайт.')}
                            </div>
                            {errors.map(error => <FormError key={error} error={error}/>)}
                            <div className="center__content">
                                <div className="center__content-row">
                                    <label>{l('Имя пользователя:')}</label>
                                    <input
                                        name="email"
                                        type="text"
                                        onChange={this.handleInputChange}
                                        className={cx('e2eEmail', {error: invalidatedFields.email})}
                                    />
                                </div>
                                <div className="center__content-row">
                                    <label>{l('Пароль:')}</label>
                                    <input
                                        name="password"
                                        type="password"
                                        onChange={this.handleInputChange}
                                        className={cx('e2ePassword', {error: invalidatedFields.password})}
                                    />
                                </div>
                                <div className="center__content-row_alt">
                            <Link to="/reset-password">{l('Забыли пароль?')}</Link>
                        </div>
                        <input type="submit" className="e2eLoginButton btn btn-def" value={l('Войти')} />
                            </div>
                        </div>
                    </form>

        );
    }

    /* eslint-enable */
}
