import Cube from './cube.js'
import Square from './square.js'
import Point from './point.js'

export const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const context = canvas.getContext('2d')
export default context

const myCube = new Cube(Square.createFromSize(new Point(150, 150, 0), 150))
setInterval(() => {
	context.clearRect(0, 0, canvas.width, canvas.height)
	myCube.update()
	myCube.render()
}, 5)
console.log(myCube)
