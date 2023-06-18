// Функция проверяет координаты на валидность.
export const isValidCoordinates = (x: number, y: number) =>
  0 <= x && x < 10 && 0 <= y && y < 10
