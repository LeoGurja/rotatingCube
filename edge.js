import Vector from './vector.js'

export default class Edge {
	constructor(point1, point2) {
		this.p1 = point1
		this.p2 = point2
		this.vector = new Vector(this.p1, this.p2)
	}

	getVector() {
		return this.vector
	}
}
