import Edge from './edge.js'
import context from './index.js'
import Point from './point.js'

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
		return (this.topLeft.z + this.topRight.z + this.bottomLeft.z + this.bottomRight.z) / 4
	}

	static createFromSize(topLeft, size) {
		return new Square(topLeft, Point.translate(topLeft, size, 0, 0), Point.translate(topLeft, size, 0, 0), Point.translate(topLeft, size, size, 0))
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
		context.beginPath()
		context.strokeStyle = '#000000'
		this.edges.forEach(edge => edge.render())
		context.stroke()
		context.closePath()
		context.fillStyle = '#F5F5F5'
		context.fill()
	}
}
