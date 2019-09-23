import Cube from './cube.js'
import Square from './square.js'
import Point from './point.js'

const canvas = document.querySelector('canvas')
canvas.width = window.innerHeight
canvas.height = window.innerHeight
export default canvas.getContext('2d')

const myCube = new Cube(Square.createFromSize(new Point(150, 150, 0), 150))
myCube.render()
console.log(myCube)
