export const isBase64 = (str: string) => {
  if (str === '' || str.trim() === '') { return false; }
  try {
    const encoded = Buffer.from(str, 'base64').toString('utf8');

    return Buffer.from(encoded, 'utf8').toString('base64') === str;
  } catch (err) {
    return false;
  }
};
