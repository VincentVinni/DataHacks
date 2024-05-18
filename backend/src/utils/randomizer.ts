export const getRandomNumber = (number: number): number => {
  if (number < 1) {
    throw new Error('The value must be greater than or equal to 1.')
  }
  return Math.floor(Math.random() * number) + 1;
}