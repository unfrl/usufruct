import slugify from 'slugify';

/**
 * Wrapper around `slugify` taking default options using '-' as word separator.
 */
export const getSlug = (value: string, lower = true) => {
  return slugify(value, { lower });
};
