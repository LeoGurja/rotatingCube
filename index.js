import Cube from './cube.js'
import Square from './square.js'
import Point from './point.js'

const canvas = document.querySelector('canvas')
export default canvas.getContext('2d')

const myCube = new Cube(Square.createFromSize(new Point(50, 50, 50), 50))
setInterval(() => {
	myCube.render()
}, 1000)
