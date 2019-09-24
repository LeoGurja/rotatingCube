import Square from './square.js'
import Point from './point.js'
import { canvas } from './index.js'
import randomColor from './randomColor.js'

export default class Cube {
	constructor(square) {
		this.frontFace = square
		this.speed = [2, 2]
		this.createFaces()
		this.faces = [
			this.backFace,
			this.bottomFace,
			this.leftFace,
			this.rightFace,
			this.topFace,
			this.frontFace
		]
	}

	update() {
		this.faces.forEach(face => face.update(this.speed))
		this.collide()
	}

	render() {
		this.faces.sort((a, b) => b.averageZ() - a.averageZ())
		this.faces.forEach(face => {
			face.render()
		})
	}

	collide() {
		let changed = false
		this.faces.forEach((face) => {
			face.points.forEach((point) => {
				if (point.x <= 0) {
					this.speed[0] = Math.abs(this.speed[0])
					changed = true
				}
				if (point.x >= canvas.width) {
					this.speed[0] = Math.abs(this.speed[0]) * -1
					changed = true
				}
				if (point.y <= 0) {
					this.speed[1] = Math.abs(this.speed[1])
					changed = true
				}
				if (point.y >= canvas.height) {
					this.speed[1] = Math.abs(this.speed[1]) * -1
					changed = true
				}
			})
			if (changed) face.color = randomColor()
		})
	}

	createFaces() {
		this.backFace = new Square(
			Point.translate(
				this.frontFace.topLeft,
				50,
				-50,
				this.frontFace.edgeSize()
			),
			Point.translate(
				this.frontFace.topRight,
				50,
				-50,
				this.frontFace.edgeSize()
			),
			Point.translate(
				this.frontFace.bottomLeft,
				50,
				-50,
				this.frontFace.edgeSize()
			),
			Point.translate(
				this.frontFace.bottomRight,
				50,
				-50,
				this.frontFace.edgeSize()
			)
		)

		this.leftFace = new Square(
			this.frontFace.topLeft,
			this.backFace.topLeft,
			this.frontFace.bottomLeft,
			this.backFace.bottomLeft
		)

		this.rightFace = new Square(
			this.frontFace.topRight,
			this.backFace.topRight,
			this.frontFace.bottomRight,
			this.backFace.bottomRight
		)

		this.topFace = new Square(
			this.frontFace.topLeft,
			this.frontFace.topRight,
			this.backFace.topLeft,
			this.backFace.topRight
		)

		this.bottomFace = new Square(
			this.frontFace.bottomLeft,
			this.frontFace.bottomRight,
			this.backFace.bottomLeft,
			this.backFace.bottomRight
		)
	}
}
