import { rowCount, colCount } from '../utils/boardSize'

export const useCreateGrid = () => {
  const grid = []
  for (let i = 0; i < rowCount; i++) {
    grid.push(Array(colCount).fill(0))
  }
  return grid
}
