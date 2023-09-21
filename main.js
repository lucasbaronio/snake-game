import './style.css'

const BOARD_SIZE = 21
let lastRenderTime
const SNAKE_SPEED = 5
const DIRECTION_TYPE = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  UP: 'UP',
  DOWN: 'DOWN'
}
let snakeBody
let currentDirection
let newDirection
initState()

function initState () {
  currentDirection = ''
  newDirection = ''
  lastRenderTime = 0
  snakeBody = [{ x: 5, y: 3 }]
}

const nextSnakePosition = {
  [DIRECTION_TYPE.LEFT]: {
    getNewPosition: (x, y) => ({ x: x - 1, y }),
    isValid: () => ![DIRECTION_TYPE.LEFT, DIRECTION_TYPE.RIGHT].includes(currentDirection)
  },
  [DIRECTION_TYPE.UP]: {
    getNewPosition: (x, y) => ({ x, y: y - 1 }),
    isValid: () => ![DIRECTION_TYPE.UP, DIRECTION_TYPE.DOWN].includes(currentDirection)
  },
  [DIRECTION_TYPE.RIGHT]: {
    getNewPosition: (x, y) => ({ x: x + 1, y }),
    isValid: () => ![DIRECTION_TYPE.LEFT, DIRECTION_TYPE.RIGHT].includes(currentDirection)
  },
  [DIRECTION_TYPE.DOWN]: {
    getNewPosition: (x, y) => ({ x, y: y + 1 }),
    isValid: () => ![DIRECTION_TYPE.DOWN, DIRECTION_TYPE.UP].includes(currentDirection)
  }
}

function main (currentTime) {
  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
  lastRenderTime = currentTime
  // console.log('Render')

  update()
  draw()
}

window.requestAnimationFrame(main)

function update () {
  if (currentDirection === '' && newDirection === '') return

  if (currentDirection === newDirection) {
    moveSnakeTo(newDirection)
    return
  }
  const { isValid } = nextSnakePosition[newDirection]
  if (isValid()) moveSnakeTo(newDirection)
  else moveSnakeTo(currentDirection)
}

function moveSnakeTo (direction) {
  const lastSnakeSegment = snakeBody[snakeBody.length - 1]
  const { x, y } = lastSnakeSegment
  const { getNewPosition } = nextSnakePosition[direction]
  const newPosition = getNewPosition(x, y)
  console.log(newPosition)
  if (!isValidPosition(newPosition)) {
    window.alert('Game Over')
    initState()
    return
  }
  snakeBody.push(newPosition)
  snakeBody.shift()
  currentDirection = direction
}

function draw () {
  const gameBoard = document.getElementById('game-board')
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
}

function drawSnake (gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = segment.y
    snakeElement.style.gridColumnStart = segment.x
    snakeElement.classList.add('snake')
    gameBoard.append(snakeElement)
  })
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') newDirection = DIRECTION_TYPE.LEFT
  if (event.key === 'ArrowRight') newDirection = DIRECTION_TYPE.RIGHT
  if (event.key === 'ArrowUp') newDirection = DIRECTION_TYPE.UP
  if (event.key === 'ArrowDown') newDirection = DIRECTION_TYPE.DOWN
})

function isValidPosition (newPosition) {
  return !(newPosition.x < 1 || newPosition.x > BOARD_SIZE || newPosition.y < 1 || newPosition.y > BOARD_SIZE)
}
