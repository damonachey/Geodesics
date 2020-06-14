export const Utilities = {
  random(from, to) {
    return from + Math.floor(Math.random() * (to - from));
  },

  shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }
};
