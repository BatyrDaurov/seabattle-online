import { useContext } from 'react'
import { CellSize } from '@lib/providers/CellSize'

const useCellSize = () => useContext(CellSize)

export default useCellSize
