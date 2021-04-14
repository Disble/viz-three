const randomNumber = (min = 0, max = 100) =>
  parseInt((Math.random() * (max - min + 1)), 10) + min;

export default randomNumber;