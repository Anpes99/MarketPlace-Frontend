export const toBase64 = (arr) => {
  return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ""));
};
