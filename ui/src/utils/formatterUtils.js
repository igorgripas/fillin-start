import moment from 'moment';

export const DEFAULT_FORMAT = 'YYYY-MM-DD';
export const DATE_FORMAT = 'DD.MM.YYYY';

export const buildString = (...values) => values.filter(item => !!item).join(' ');

export const getFormattedDate = dateStr => moment(dateStr).format(DATE_FORMAT);

export const formatFileSize = value => (value >= 1024 ? `${(value / 1024).toFixed(2)} mB` : `${value.toFixed(2)} kB`);
