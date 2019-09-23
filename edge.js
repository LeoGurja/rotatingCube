import Vector from "./vector";
import Point from "./point";

export default class Edge {
	constructor(point1, point2) {
		this.p1 = point1;
		this.p2 = point2;
		this.vector = new Vector(this.p1, this.p2);
	}

	contains(point) {
		const vectorToBeTested = new Vector(this.p1, point);
		const multiple = this.vector.multiplier(vectorToBeTested);
		return (multiple && multiple > 0 && multiple < 1);
	}


}