import crypto from 'crypto';

const ALOGRITHM = 'sha256';
const ENCODING = 'utf8';

export const hmac = (
  key: string,
  message: string,
  encoding?: crypto.BinaryToTextEncoding,
) => {
  return crypto
    .createHmac(ALOGRITHM, key)
    .update(message, ENCODING)
    .digest(encoding);
};
