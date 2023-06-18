import { ShotType } from 'types/game-types'

// Если в сущ. массиве уже есть выстрел из нового, то не добавляем его
export const filterShots = (arr1: ShotType[], arr2: ShotType[]) => {
  const existingObjects = arr1.map((el) => JSON.stringify(el))

  for (let i = 0; i < arr2.length; i++) {
    const obj2 = arr2[i]
    const obj2String = JSON.stringify(obj2)

    if (!existingObjects.includes(obj2String)) {
      arr1.push(obj2)
      existingObjects.push(obj2String)
    }
  }
  return arr1
}
