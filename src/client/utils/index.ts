/* eslint-disable import/prefer-default-export */
export const getHash = (length = 10) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const formatDate = (date: number | Date | string): string => {
  return new Date(date).toISOString().slice(0, 10);
};
