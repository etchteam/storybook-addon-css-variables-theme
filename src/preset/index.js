export function previewAnnotations(entry = []) {
  return [...entry, require.resolve('../preview')];
}

module.exports = { previewAnnotations };
