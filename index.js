import Cube from './cube.js'

export const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const context = canvas.getContext('2d')
export default context

function randomCube() {
	return new Cube([Math.random() * canvas.width, Math.random() * canvas.height, 0], 200)
}

const cubes = []
for (let i = 0; i < 1; i++) {
	cubes.push(randomCube())
}

setInterval(async() => {
	context.clearRect(0, 0, canvas.width, canvas.height)
	cubes.forEach((cube) => {
		cube.update()
		cube.render()
	})
}, 1)
