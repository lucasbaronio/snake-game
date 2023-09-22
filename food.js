import { FOOD_COLOR } from './constants'
import { isEqualPosition } from './utils'

let foodPosition

export function initFoodState (position) {
  setNewFoodPosition(position)

  document.styleSheets[0].insertRule(`.food { background-color: ${FOOD_COLOR}; }`)
}

export function setNewFoodPosition (position) {
  foodPosition = position
}

export function drawFood (gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = foodPosition.y
  foodElement.style.gridColumnStart = foodPosition.x
  foodElement.classList.add('food')
  gameBoard.append(foodElement)
}

export function isFoodPosition (position) {
  return isEqualPosition(foodPosition, position)
}
