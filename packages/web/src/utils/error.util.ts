/**
 * Attempts to parse the `error.message` property as JSON `{ message: string }`,
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
