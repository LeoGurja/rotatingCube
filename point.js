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
		this.y = Math.cos(dx) * this.y - Math.sin(dx) * this.z
		this.z = Math.sin(dx) * this.y + Math.cos(dx) * this.z

		this.x = Math.cos(dy) * this.x + Math.sin(dy) * this.z
		this.z = Math.cos(dy) * this.z - Math.sin(dy) * this.x

		this.x = Math.cos(dz) * this.x - Math.sin(dz) * this.y
		this.y = Math.sin(dz) * this.x + Math.cos(dz) * this.y
	}
}
