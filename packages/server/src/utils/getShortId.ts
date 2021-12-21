import { nanoid } from 'nanoid';

const DEFAULT_ID_LENGTH = 8;

export const getShortId = (idLength = DEFAULT_ID_LENGTH) => {
  return nanoid(idLength);
};
