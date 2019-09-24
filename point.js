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

	translate(dx, dy, dz) {
		this.x += dx
		this.y += dy
		this.z += dz
	}

	rotate(dx, dy, dz) {
		this.y = Math.cos(dx * Math.PI / 180) * this.y - Math.sin(dx * Math.PI / 180) * this.z
		this.z = Math.sin(dx * Math.PI / 180) * this.y + Math.cos(dx * Math.PI / 180) * this.z

		this.x = Math.cos(dy * Math.PI / 180) * this.x + Math.sin(dy * Math.PI / 180) * this.z
		this.z = Math.cos(dy * Math.PI / 180) * this.z - Math.sin(dy * Math.PI / 180) * this.x

		this.x = Math.cos(dz * Math.PI / 180) * this.x - Math.sin(dz * Math.PI / 180) * this.y
		this.y = Math.sin(dz * Math.PI / 180) * this.x + Math.cos(dz * Math.PI / 180) * this.y
	}

	distance(point) {
		return Math.sqrt((this.x - point.x) ** 2 + (this.y - point.y) ** 2 + (this.z - point.z) ** 2)
	}
}
