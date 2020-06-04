export const generateStr = () => {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5);
};

export const genUniqIndexes = (amount, len, arr = []) => {
  while (arr.length < amount) {
    const item = Math.floor(Math.random() * len);
    if (arr.indexOf(item) === -1) arr.push(item);
    genUniqIndexes(amount, len, arr);
  }
  return arr;
};

export const doScale = (e, scale) => {
  e.currentTarget.style.transform = `scale(${scale}, ${scale})`;
};
