export const calculateBoxSize = (displaySize: { h: number; w: number }) => {
  let newBoxSize = Math.round((displaySize.h - 150 - 30 - 30 - 100) / 3);
  while (displaySize.w - newBoxSize * 3 < 40) {
    newBoxSize -= 1;
  }
  return newBoxSize;
};
