export const dateToSafeISOString = (date = new Date()) => date.toISOString().replace(/[-:]/g, '');
