export function managerEntries(entry = []) {
  return [...entry, require.resolve('../manager')];
}

export function previewAnnotations(entry = []) {
  return [...entry, require.resolve('../preview')];
}

module.exports = { managerEntries, previewAnnotations };
