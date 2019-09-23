import Square from "./square";

export default class Cube {
	constructor(square) {
		this.frontFace = square;
		this.createFaces();

	}

	createFaces() {
		this.backFace = new Square(
			Point.translate(square.topLeft, 0, 0, square.edgeSize()),
			Point.translate(square.topRight, 0, 0, square.edgeSize()),
			Point.translate(square.bottomLeft, 0, 0, square.edgeSize()),
			Point.translate(square.bottomRight, 0, 0, square.edgeSize())
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