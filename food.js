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
  const foodElement = document.createElement('img')
  foodElement.src = '/food.svg'
  foodElement.style.gridRowStart = foodPosition.y
  foodElement.style.gridColumnStart = foodPosition.x
  foodElement.style.margin = 'auto'
  gameBoard.append(foodElement)
}

export function isFoodPosition (position) {
  return isEqualPosition(foodPosition, position)
}
