import './style.css'
import { BOARD_SIZE_X, BOARD_SIZE_Y, DIRECTION_TYPE, GAME_BOARD_COLOR, SNAKE_SPEED } from './constants'
import { addFoodEaten, drawSnake, getRandomAndValidPosition, initSnakeState, isValidNextDirection, moveSnakeTo } from './snake'
import { drawFood, initFoodState, isFoodPosition, setNewFoodPosition } from './food'
import { getRandomPosition } from './utils'

let lastRenderTime

let currentDirection
let newDirection
let foodLeft
let gameInPause

initState()

function initState () {
  currentDirection = ''
  newDirection = ''
  lastRenderTime = 0
  foodLeft = 20
  gameInPause = false
  initSnakeState(getRandomPosition())
  initFoodState(getRandomAndValidPosition())

  const gameBoard = document.getElementById('game-board')
  gameBoard.style.gridTemplateColumns = `repeat(${BOARD_SIZE_X}, 1fr)`
  gameBoard.style.gridTemplateRows = `repeat(${BOARD_SIZE_Y}, 1fr)`
  gameBoard.style.backgroundColor = GAME_BOARD_COLOR

  const banner = document.getElementById('banner')
  banner.classList.add('hidden')
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

function moveSnakeSuccess (direction, newPosition) {
  currentDirection = direction
  if (isFoodPosition(newPosition)) {
    addFoodEaten(newPosition)
    setNewFoodPosition(getRandomAndValidPosition())
    foodLeft--
  }
}

function finishGame (isGameOver) {
  gameInPause = true
  const banner = document.getElementById('banner')
  const bannerText = banner.querySelector('span')
  bannerText.innerText = isGameOver ? 'GAME OVER!' : 'Well DONE!'
  banner.classList.remove('hidden')
}

function gameOver () {
  finishGame(true)
}

function draw () {
  const gameBoard = document.getElementById('game-board')
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
  drawFoodLeft()
  if (foodLeft === 0) {
    finishGame(false)
  }
}

function drawFoodLeft () {
  const foodLeftsElement = document.getElementById('food-left')
  foodLeftsElement.innerHTML = ''
  for (let i = 0; i < foodLeft; i++) {
    const foodElement = document.createElement('img')
    foodElement.src = '/food.svg'
    // foodElement.classList.add('w-5', 'h-5')
    foodLeftsElement.appendChild(foodElement)
  }
}

document.addEventListener('keydown', (event) => {
  if (gameInPause) return
  if (event.key === 'ArrowLeft') newDirection = DIRECTION_TYPE.LEFT
  if (event.key === 'ArrowRight') newDirection = DIRECTION_TYPE.RIGHT
  if (event.key === 'ArrowUp') newDirection = DIRECTION_TYPE.UP
  if (event.key === 'ArrowDown') newDirection = DIRECTION_TYPE.DOWN
})

document.getElementById('play-again-btn').onclick = function () {
  initState()
}
