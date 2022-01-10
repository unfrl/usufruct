export const clipAtMaxLength = (
  value: string,
  maxLength: number = 125,
  trailingChars: string = '...',
) => {
  const trimmed = value?.trim();
  if (!trimmed) {
    return '';
  }

  if (trimmed.length + trailingChars.length < maxLength) {
    return trimmed;
  }

  return trimmed.substring(0, maxLength - trailingChars.length) + trailingChars;
};
