/**
 * Attempts to parse the `error.message` property as JSON `{ message: string }`,
 * returning the message value if successful.
 */
export const tryParseRestError = (error: any) => {
  if (!error?.message) {
    return error ?? '';
  }

  try {
    const json = JSON.parse(error.message);
    return json?.message ?? error.message;
  } catch {
    return error.message;
  }
};
