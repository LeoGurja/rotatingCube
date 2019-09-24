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
		this.color = randomColor()

		this.topEdge = new Edge(this.topLeft, this.topRight)
		this.rightEdge = new Edge(this.topRight, this.bottomRight)
		this.bottomEdge = new Edge(this.bottomRight, this.bottomLeft)
		this.leftEdge = new Edge(this.bottomLeft, this.topLeft)
		this.edges = [this.topEdge, this.rightEdge, this.bottomEdge, this.leftEdge]
	}

	async update(rotateSpeed) {
		this.points.forEach(point => {
			point.rotate(rotateSpeed[0], rotateSpeed[1], rotateSpeed[2])
		})
	}

	averageZ() {
		return (this.topLeft.z + this.topRight.z + this.bottomLeft.z + this.bottomRight.z) / 4
	}

	static createFromSize(topLeft, size) {
		return new Square(topLeft, Point.translate(topLeft, size, 0, 0), Point.translate(topLeft, 0, size, 0), Point.translate(topLeft, size, size, 0))
	}

	edgeSize() {
		return this.topLeft.distance(this.topRight)
	}

	async render(pos) {
		context.strokeStyle = '#000000'
		context.fillStyle = this.color
		context.lineWidth = 2
		context.lineJoin = context.lineCap = 'round'
		context.beginPath()
		context.moveTo(this.topLeft.x + pos[0], this.topLeft.y + pos[1])
		context.lineTo(this.topRight.x + pos[0], this.topRight.y + pos[1])
		context.lineTo(this.bottomRight.x + pos[0], this.bottomRight.y + pos[1])
		context.lineTo(this.bottomLeft.x + pos[0], this.bottomLeft.y + pos[1])
		context.lineTo(this.topLeft.x + pos[0], this.topLeft.y + pos[1])
		context.closePath()
		context.stroke()
		context.fill()
	}
}
