/**
 * Attempts to parse JSON as `{ message: string }` from the `error.message` property,
 * returning the message value if successful.
 */
export const tryParseRestError = (error: any) => {
  if (!error?.message) {
    return '';
  }

  try {
    const json = JSON.parse(error.message);
    return json?.message ?? '';
  } catch {
    return '';
  }
};
