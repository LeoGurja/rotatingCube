import Vector from './vector.js'
import context from './index.js'

export default class Edge {
	constructor(point1, point2) {
		this.p1 = point1
		this.p2 = point2
		this.vector = new Vector(this.p1, this.p2)
	}

	contains(point) {
		const vectorToBeTested = new Vector(this.p1, point)
		const multiple = this.vector.multiplier(vectorToBeTested)
		return (multiple && multiple > 0 && multiple < 1)
	}

	getVector() {
		return this.vector
	}

	render() {
		context.moveTo(this.p1.x, this.p1.y)
		context.lineTo(this.p2.x, this.p2.y)
	}
}
