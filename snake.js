import { BOARD_SIZE_X, BOARD_SIZE_Y, DIRECTION_TYPE, SNAKE_COLOR } from './constants'
import { getRandomPosition, isEqualPosition } from './utils'

let snakeBody
let foodEaten

const nextSnakePosition = {
  [DIRECTION_TYPE.LEFT]: {
    getNewPosition: (x, y) => ({ x: x - 1, y }),
    isValid: (currentDirection) => ![DIRECTION_TYPE.LEFT, DIRECTION_TYPE.RIGHT].includes(currentDirection)
  },
  [DIRECTION_TYPE.UP]: {
    getNewPosition: (x, y) => ({ x, y: y - 1 }),
    isValid: (currentDirection) => ![DIRECTION_TYPE.UP, DIRECTION_TYPE.DOWN].includes(currentDirection)
  },
  [DIRECTION_TYPE.RIGHT]: {
    getNewPosition: (x, y) => ({ x: x + 1, y }),
    isValid: (currentDirection) => ![DIRECTION_TYPE.LEFT, DIRECTION_TYPE.RIGHT].includes(currentDirection)
  },
  [DIRECTION_TYPE.DOWN]: {
    getNewPosition: (x, y) => ({ x, y: y + 1 }),
    isValid: (currentDirection) => ![DIRECTION_TYPE.DOWN, DIRECTION_TYPE.UP].includes(currentDirection)
  }
}

function isSnakeBody (position) {
  return snakeBody.some((segment) => isEqualPosition(position, segment))
}

function isValidPosition (newPosition) {
  return !(newPosition.x < 1 || newPosition.x > BOARD_SIZE_X || newPosition.y < 1 || newPosition.y > BOARD_SIZE_Y) && !isSnakeBody(newPosition)
}

export function initSnakeState (position) {
  snakeBody = [position]
  foodEaten = []

  document.styleSheets[0].insertRule(`.snake { background-color: ${SNAKE_COLOR}; }`)
}

export function drawSnake (gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = segment.y
    snakeElement.style.gridColumnStart = segment.x
    snakeElement.classList.add('snake')
    gameBoard.append(snakeElement)
  })
}

// TODO: to be improve
export function getRandomAndValidPosition () {
  let newPosition
  do {
    newPosition = getRandomPosition()
  } while (isSnakeBody(newPosition))
  return newPosition
}

export function isValidNextDirection (currentDirection, newDirection) {
  const { isValid } = nextSnakePosition[newDirection]
  return isValid(currentDirection)
}

export function moveSnakeTo (direction, onSuccess, onError) {
  const firstSnakeSegment = snakeBody[snakeBody.length - 1]
  const { x, y } = firstSnakeSegment
  const { getNewPosition } = nextSnakePosition[direction]
  const newPosition = getNewPosition(x, y)
  if (!isValidPosition(newPosition)) {
    onError()
    return
  }
  snakeBody.push(newPosition)
  if (foodEaten.length > 0 && isEqualPosition(foodEaten[0], snakeBody[0])) {
    foodEaten.shift()
  } else {
    snakeBody.shift()
  }
  onSuccess(newPosition)
}

export function addFoodEaten (position) {
  foodEaten.push(position)
}
