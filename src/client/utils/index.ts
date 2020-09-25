/* eslint-disable import/prefer-default-export */

export const formatDate = (date: number | Date | string): string => {
  return new Date(date).toISOString().slice(0, 10);
};
