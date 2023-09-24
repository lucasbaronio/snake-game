import './style.css'
import { BOARD_SIZE_X, BOARD_SIZE_Y, DIRECTION_TYPE, GAME_BOARD_COLOR, SNAKE_SPEED } from './constants'
import { addFoodEaten, drawSnake, getRandomAndValidPosition, initSnakeState, isValidNextDirection, moveSnakeTo } from './snake'
import { drawFood, initFoodState, isFoodPosition, setNewFoodPosition } from './food'
import { getRandomPosition } from './utils'

let lastRenderTime

let currentDirection
let newDirection

initState()

function initState () {
  currentDirection = ''
  newDirection = ''
  lastRenderTime = 0
  initSnakeState(getRandomPosition())
  initFoodState(getRandomAndValidPosition())

  const gameBoard = document.getElementById('game-board')
  gameBoard.style.gridTemplateColumns = `repeat(${BOARD_SIZE_X}, 1fr)`
  gameBoard.style.gridTemplateRows = `repeat(${BOARD_SIZE_Y}, 1fr)`
  gameBoard.style.backgroundColor = GAME_BOARD_COLOR
}

function main (currentTime) {
  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
  lastRenderTime = currentTime

  update()
  draw()
}

window.requestAnimationFrame(main)

function update () {
  if (currentDirection === '' && newDirection === '') return

  if (currentDirection === newDirection) {
    moveSnakeTo(newDirection, (newPosition) => moveSnakeSuccess(newDirection, newPosition), gameOver)
    return
  }

  if (isValidNextDirection(currentDirection, newDirection)) {
    moveSnakeTo(newDirection, (newPosition) => moveSnakeSuccess(newDirection, newPosition), gameOver)
  } else {
    moveSnakeTo(currentDirection, (newPosition) => moveSnakeSuccess(currentDirection, newPosition), gameOver)
  }
}

// TODO: check if player wins
function moveSnakeSuccess (direction, newPosition) {
  currentDirection = direction
  if (isFoodPosition(newPosition)) {
    addFoodEaten(newPosition)
    setNewFoodPosition(getRandomAndValidPosition())
  }
}

function gameOver () {
  window.alert('Game Over')
  initState()
}

function draw () {
  const gameBoard = document.getElementById('game-board')
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') newDirection = DIRECTION_TYPE.LEFT
  if (event.key === 'ArrowRight') newDirection = DIRECTION_TYPE.RIGHT
  if (event.key === 'ArrowUp') newDirection = DIRECTION_TYPE.UP
  if (event.key === 'ArrowDown') newDirection = DIRECTION_TYPE.DOWN
})
