import { useEffect, useRef, type MouseEvent } from 'react'
import { rowCount, colCount, squareSize } from '../../utils/boardSize'
import { useGameStore } from '../../store/store'
import { useCreateGrid } from '../../hooks/useCreateGrid'
import styles from './Board.module.scss'

function Board() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const grid = useGameStore((state) => state.grid)
  const setGrid = useGameStore((state) => state.setGrid)
  const createGrid = useCreateGrid()

  useEffect(() => {
    setGrid(createGrid)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    const width = colCount * squareSize
    const height = rowCount * squareSize

    canvas.width = width
    canvas.height = height
    context.clearRect(0, 0, width, height)

    grid.forEach((row, rowIndex) => {
      row.forEach((cellValue, colIndex) => {
        const x = colIndex * squareSize
        const y = rowIndex * squareSize

        context.fillStyle = cellValue === 1 ? '#7dd3fc' : '#f8fafc'
        context.fillRect(x, y, squareSize, squareSize)
        context.strokeStyle = '#e2e8f0'
        context.strokeRect(x, y, squareSize, squareSize)
      })
    })
  }, [grid])

  const setCellState = (x: number, y: number) => {
    const newGrid = [...grid]
    newGrid[x][y] = newGrid[x][y] === 0 ? 1 : 0
    setGrid(newGrid)
  }

  const handleCanvasClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const rowIndex = Math.floor(y / squareSize)
    const colIndex = Math.floor(x / squareSize)

    if (rowIndex < 0 || rowIndex >= grid.length || colIndex < 0 || colIndex >= grid[rowIndex].length) {
      return
    }

    setCellState(rowIndex, colIndex)
  }

  return (
    <section className={styles.board}>
      <canvas ref={canvasRef} className={styles.canvas} width={colCount * squareSize} height={rowCount * squareSize} onClick={handleCanvasClick} />
    </section>
  )
}

export default Board
