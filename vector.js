export default class Vector {
	constructor(point1, point2) {
		this.dx = point2.x - point1.x;
		this.dy = point2.y - point1.y;
		this.dz = point2.z - point1.z;
	}

	multiplier(vector) {
		const multiplier = vector.dx / this.dx;

		if (vector.dy / this.dy === multiplier && vector.dz / this.dz === multipler) {
			return multiplier;
		}
		return undefined
	}
}