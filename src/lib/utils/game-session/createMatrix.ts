export const createMatrix = () => {
  const matrix: { x: number; y: number }[][] = []
  for (let x = 0; x < 10; x++) {
    const row = []
    for (let y = 0; y < 10; y++) {
      const item = { x: y, y: x }
      row.push(item)
    }
    matrix.push(row)
  }
  return matrix
}
