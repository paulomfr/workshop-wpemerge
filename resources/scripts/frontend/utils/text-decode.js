export const limitText = (text, limit, type = 'words') => {
  if (typeof text !== 'string') {
    return '';
  }

  const types = {
    words: (string = '') => string.split(' ').splice(0, limit).join(' '),
    text: (string = '') => `${string.substring(0, limit)}...`,
  };

  return types[type](text);
};
