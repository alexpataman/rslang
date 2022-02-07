/* eslint-disable dot-notation */
/* eslint-disable no-prototype-builtins */
export const wordAdapter = (word: { [key: string]: string }) => {
  if (word.hasOwnProperty('_id')) {
    word['id'] = word['_id'];
    delete word['_id'];
  }
  return word;
};
