import { randomInt } from './randomInt';

export const createBoxes = (length: number, maxNumber: number) => {
  const target = randomInt(maxNumber);
  const posTarget = randomInt(length - 1);
  let boxes: number[] = [],
    i = 0;

  while (i < length) {
    let newItem = randomInt(maxNumber);
    while (newItem === target || boxes.includes(newItem)) {
      newItem = randomInt(maxNumber);
    }
    boxes[i++] = newItem;
  }

  boxes[posTarget] = target;

  return { target, boxes };
};
