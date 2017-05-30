export const validateEmail = (email) => {
    const errors = [];
    const invalidatedFields = {};
    if (!email || !email.trim()) {
        errors.push(l('Пожалуйста, введите email'));
        invalidatedFields.email = true;
        return { errors, invalidatedFields };
    }

    if (email.trim().indexOf('@') === -1) {
        errors.push(l('Неверный формат email'));
        invalidatedFields.email = true;
        return { errors, invalidatedFields };
    }
    return { errors, invalidatedFields };
};

export const validatePassword = (password, name = 'password') => {
    const errors = [];
    const invalidatedFields = {};
    if (!password || !password.trim()) {
        errors.push(l('Пожалуйста, введите пароль'));
        invalidatedFields[name] = true;
        return { errors, invalidatedFields };
    }
    return { errors, invalidatedFields };
};

export const validateCredentials = (credentials) => {
    const email = validateEmail(credentials.email);
    if (email.errors.length) {
        return email;
    }
    const password = validatePassword(credentials.password);
    if (password.errors.length) {
        return password;
    }
    return { errors: [], invalidatedFields: {} };
};

export const compareTwoPasswords = (value) => {
    const errors = [];
    const invalidatedFields = {};
    const { password, confirmPassword } = value;
    const validationResultOfPassword = validatePassword(password);
    if (validationResultOfPassword.errors.length) {
        return validationResultOfPassword;
    }
    const validationResultOfConfirmPassword = validatePassword(confirmPassword, 'confirmPassword');
    if (validationResultOfConfirmPassword.errors.length) {
        return validationResultOfConfirmPassword;
    }
    if (password !== confirmPassword) {
        errors.push(l('Пароли должны совпадать'));
        invalidatedFields.password = true;
        invalidatedFields.confirmPassword = true;
    } else if (password.length < 8) {
        errors.push(l('Пароль должен содержать минимум 8 символов'));
        invalidatedFields.password = true;
        invalidatedFields.confirmPassword = true;
    }
    return { errors, invalidatedFields };
};
