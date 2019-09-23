export default class Point {
	constructor(x, y, z) {
		this.x = x
		this.y = y
		this.z = z
	}

	static translate(point, x, y, z) {
		return new Point(point.x + x, point.y + y, point.z + z)
	}

	static translateZ(point, z) {
		return new Point(point.x, point.y, point.z + z)
	}

	translate(x, y, z) {
		this.x += x
		this.y += y
		this.z += z
	}

	distance(point) {
		return Math.sqrt((this.x - point.x) ** 2 + (this.y - point.y) ** 2 + (this.z - point.z) ** 2)
	}
}
