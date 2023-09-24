import { BOARD_SIZE_X, BOARD_SIZE_Y } from './constants'

export function isEqualPosition (p1, p2) {
  return p1.x === p2.x && p1.y === p2.y
}

export function getRandomNumbersBetween (lower, upper) {
  const possibilities = upper - lower
  return lower + (Math.floor(Math.random() * (possibilities + 1)))
}

export function getRandomPosition () {
  return { x: getRandomNumbersBetween(1, BOARD_SIZE_X), y: getRandomNumbersBetween(1, BOARD_SIZE_Y) }
}
