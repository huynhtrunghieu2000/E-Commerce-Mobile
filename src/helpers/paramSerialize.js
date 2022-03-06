export const paramsToString = (params) =>
  Object.entries(params).reduce(
    (acc, [key, value], index, array) =>
      `${acc}${key}=${encodeURIComponent(value)}${
        index !== array.length - 1 ? '&' : ''
      }`,
    '',
  )
