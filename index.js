import Cube from './cube.js'

export const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const context = canvas.getContext('2d')
export default context

const myCube = new Cube([200, 200, 200], 150)
setInterval(async() => {
	context.clearRect(0, 0, canvas.width, canvas.height)
	myCube.update()
	myCube.render()
}, 1)
