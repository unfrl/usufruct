/**
 * Returns the capitalized first initial of the first and last part of the string.
 */
export const getInitials = (name: string) => {
  if (!name) {
    return '';
  }

  const split = name.split(' ');
  const first = split[0].substring(0, 1).toUpperCase();
  const last = split[split.length - 1].substring(0, 1).toUpperCase();

  if (split.length === 1) {
    return first;
  }

  return `${first}${last}`;
};
