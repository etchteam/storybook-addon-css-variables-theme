// eslint-disable-next-line import/prefer-default-export
export function managerEntries(entry: any[] = []) {
  return [...entry, require.resolve('../register')];
}

export const previewAnnotations = (entry: any[] = []) => {
  return [...entry, require.resolve('../preview')];
};

module.exports = { managerEntries, previewAnnotations };
