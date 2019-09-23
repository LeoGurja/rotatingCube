import Square from './square.js'
import Point from './point.js'

export default class Cube {
	constructor(square) {
		this.frontFace = square
		this.createFaces()
		this.faces = [
			this.backFace,
			this.leftFace,
			this.rightFace,
			this.topFace,
			this.bottomFace,
			this.frontFace
		]
	}

	render() {
		this.faces.sort((a, b) => b.averageZ() - a.averageZ())
		this.faces.forEach(face => {
			face.render()
		})
	}

	createFaces() {
		this.backFace = new Square(
			Point.translateZ(
				this.frontFace.topLeft,
				this.frontFace.edgeSize()
			),
			Point.translateZ(
				this.frontFace.topRight,
				this.frontFace.edgeSize()
			),
			Point.translateZ(
				this.frontFace.bottomLeft,
				this.frontFace.edgeSize()
			),
			Point.translateZ(
				this.frontFace.bottomRight,
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
			this.backFace.bottomRight
		)

		this.bottomFace = new Square(
			this.frontFace.bottomLeft,
			this.frontFace.bottomRight,
			this.backFace.bottomLeft,
			this.backFace.bottomRight
		)
	}
}
