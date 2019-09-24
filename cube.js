import Face from './face.js'
import Point from './point.js'
import { canvas } from './index.js'

export default class Cube {
	constructor(pos, size) {
		this.frontFace = Face.createFromSize(new Point(-size / 2, -size / 2, -size / 2), size)
		this.speed = [Math.random() * 5 + 2, Math.random() * 5 + 2, 0]
		this.pos = pos
		this.collided = false
		this.rotateSpeed = [0.1, 0.1, 0.1]
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

	async translate() {
		for (let coordinate = 0; coordinate < 3; coordinate++) {
			this.pos[coordinate] += this.speed[coordinate]
		}
	}

	async update() {
		this.translate()
		this.collide()
		this.faces.forEach(face => face.update(this.rotateSpeed))
	}

	async render() {
		this.faces.sort((a, b) => b.averageZ() - a.averageZ())
		this.faces.forEach(face => {
			face.render(this.pos)
		})
	}

	async collide() {
		let changed = false
		this.faces.forEach((face) => {
			face.points.forEach((point) => {
				if (point.x + this.pos[0] <= 0 && this.speed[0] < 0) {
					this.speed[0] = Math.abs(this.speed[0])
					this.pos[0] -= point.x + this.pos[0]
					changed = true
				}
				if (
					point.x + this.pos[0] >= canvas.width &&
					this.speed[0] > 0
				) {
					this.speed[0] = Math.abs(this.speed[0]) * -1
					this.pos[0] -= point.x + this.pos[0] - canvas.width
					changed = true
				}
				if (point.y + this.pos[1] <= 0 && this.speed[1] < 0) {
					this.speed[1] = Math.abs(this.speed[1])
					this.pos[1] -= point.y + this.pos[1]
					changed = true
				}
				if (
					point.y + this.pos[1] >= canvas.height &&
					this.speed[1] > 0
				) {
					this.speed[1] = Math.abs(this.speed[1]) * -1
					this.pos[1] -= point.y + this.pos[1] - canvas.height
					changed = true
				}
			})
		})
		if (changed) {
			if (this.speed[0] > 0) {
				this.rotateSpeed[0] = -Math.abs(
					this.rotateSpeed[0]
				)
			} else {
				this.rotateSpeed[0] = Math.abs(this.rotateSpeed[0])
			}
			if (this.speed[1] > 0) {
				this.rotateSpeed[1] =
					-Math.abs(this.rotateSpeed[1])
			} else {
				this.rotateSpeed[1] =
					Math.abs(this.rotateSpeed[1])
			}
			this.rotateSpeed[2] *= -1
		}
	}

	createFaces() {
		this.backFace = new Face(
			Point.translate(
				this.frontFace.topLeft,
				0, 0,
				this.frontFace.edgeSize()
			),
			Point.translate(
				this.frontFace.topRight,
				0, 0,
				this.frontFace.edgeSize()
			),
			Point.translate(
				this.frontFace.bottomLeft,
				0, 0,
				this.frontFace.edgeSize()
			),
			Point.translate(
				this.frontFace.bottomRight,
				0, 0,
				this.frontFace.edgeSize()
			)
		)

		this.leftFace = new Face(
			this.frontFace.topLeft,
			this.backFace.topLeft,
			this.frontFace.bottomLeft,
			this.backFace.bottomLeft
		)

		this.rightFace = new Face(
			this.frontFace.topRight,
			this.backFace.topRight,
			this.frontFace.bottomRight,
			this.backFace.bottomRight
		)

		this.topFace = new Face(
			this.frontFace.topLeft,
			this.frontFace.topRight,
			this.backFace.topLeft,
			this.backFace.topRight
		)

		this.bottomFace = new Face(
			this.frontFace.bottomLeft,
			this.frontFace.bottomRight,
			this.backFace.bottomLeft,
			this.backFace.bottomRight
		)
	}
}
