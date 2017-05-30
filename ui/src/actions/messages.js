export const HIDE_MESSAGE = 'HIDE_MESSAGE';
export const SHOW_MESSAGE = 'SHOW_MESSAGE';

export const showMessage = message => (
    {
        type: SHOW_MESSAGE,
        message,
    }
);

export const hideMessage = () => (
    {
        type: HIDE_MESSAGE,
    }
);

