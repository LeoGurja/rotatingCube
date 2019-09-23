import Edge from './edge.js'
import context from './index.js'
import Point from './point.js'
import randomColor from './randomColor.js'

export default class Square {
	constructor(topLeft, topRight, bottomLeft, bottomRight) {
		this.topLeft = topLeft
		this.topRight = topRight
		this.bottomLeft = bottomLeft
		this.bottomRight = bottomRight
		this.points = [this.topLeft, this.topRight, this.bottomLeft, this.bottomRight]

		this.topEdge = new Edge(this.topLeft, this.topRight)
		this.rightEdge = new Edge(this.topRight, this.bottomRight)
		this.bottomEdge = new Edge(this.bottomRight, this.bottomLeft)
		this.leftEdge = new Edge(this.bottomLeft, this.topLeft)
		this.edges = [this.topEdge, this.rightEdge, this.bottomEdge, this.leftEdge]
	}

	averageZ() {
		console.log(
			(this.topLeft.z +
				this.topRight.z +
				this.bottomLeft.z +
				this.bottomRight.z) /
				4
		)
		return (this.topLeft.z + this.topRight.z + this.bottomLeft.z + this.bottomRight.z) / 4
	}

	static createFromSize(topLeft, size) {
		return new Square(topLeft, Point.translate(topLeft, size, 0, 0), Point.translate(topLeft, 0, size, 0), Point.translate(topLeft, size, size, 0))
	}

	edgeSize() {
		return this.topLeft.distance(this.topRight)
	}

	isInside() {
		// TODO: is inside square
		// const vector1 = this.topEdge.getVector()
		// const vector2 = this.leftEdge.getVector()
	}

	render() {
		context.strokeStyle = '#000000'
		context.fillStyle = randomColor()
		context.lineWidth = 1
		context.lineJoin = context.lineCap = 'round'
		context.beginPath()
		context.moveTo(this.topLeft.x, this.topLeft.y)
		context.lineTo(this.topRight.x, this.topRight.y)
		context.lineTo(this.bottomRight.x, this.bottomRight.y)
		context.lineTo(this.bottomLeft.x, this.bottomLeft.y)
		context.lineTo(this.topLeft.x, this.topLeft.y)
		context.closePath()
		context.stroke()
		context.fill()
	}
}
