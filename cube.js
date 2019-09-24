import Face from './face.js'
import Point from './point.js'

export default class Cube {
	constructor(pos, size) {
		this.faces = [Face.createFromSize(new Point(-size / 2, -size / 2, -size / 2), size)]
		this.faces.push(Face.TranslateZ(this.faces[0], size))
		this.faces = [...this.faces, ...Face.linkFaces(this.faces[0], this.faces[1])]

		this.speed = [Math.random() * 5 + 2, Math.random() * 5 + 2, 0]
		this.position = pos
		this.rotationSpeed = [0.001, 0.001, 0.001]
	}

	async translate() {
		for (let coordinate = 0; coordinate < 3; coordinate++) {
			this.position[coordinate] += this.speed[coordinate]
		}
	}

	async update() {
		this.translate()
		this.collide()
		this.faces.forEach(face => face.update(this.rotationSpeed))
	}

	async render() {
		this.faces.sort((a, b) => b.averageZ() - a.averageZ())
		this.faces.forEach(face => {
			face.render(this.position)
		})
	}

	async collide() {
		let collided = {}
		const didCollide = this.faces.some((face) => {
			collided = face.collide(this.position)

			if (collided.top && this.speed[1] <= 0) {
				this.speed[1] = Math.abs(this.speed[1])
				this.position[1] -= collided.top
			} else if (collided.bottom && this.speed[1] >= 0) {
				this.speed[1] = -Math.abs(this.speed[1])
				this.position[1] -= collided.bottom
			}
			if (collided.left && this.speed[0] <= 0) {
				this.speed[0] = Math.abs(this.speed[0])
				this.position[0] -= collided.left
			} else if (collided.right && this.speed[0] >= 0) {
				this.speed[0] = -Math.abs(this.speed[0])
				this.position[0] -= collided.right
			}
			return (collided.top || collided.left || collided.right || collided.bottom)
		})
		if (didCollide) this.changeRotation()
	}

	changeRotation() {
		if (this.speed[0] > 0) {
			this.rotationSpeed[0] = -Math.abs(
				this.rotationSpeed[0]
			)
		} else {
			this.rotationSpeed[0] = Math.abs(this.rotationSpeed[0])
		}
		if (this.speed[1] > 0) {
			this.rotationSpeed[1] =
					-Math.abs(this.rotationSpeed[1])
		} else {
			this.rotationSpeed[1] =
					Math.abs(this.rotationSpeed[1])
		}
		this.rotationSpeed[2] *= -1
	}
}
