import Edge from "./line";

export default class Square {
	constructor(topLeft, topRight, bottomLeft, bottomRight) {
		this.topLeft = topLeft;
		this.topRight = topRight;
		this.bottomLeft = bottomLeft;
		this.bottomRight = bottomRight;
		
		this.topEdge = new Edge(this.topLeft, this.topRight);
		this.leftEdge = new Edge(this.bottomLeft, this.topLeft);
		this.rightEdge = new Edge(this.bottomRight, this.topRight);
		this.bottomEdge = new Edge(this.bottomLeft, this.bottomRight);
	}

	constructor(topLeft, size) {
		this.topLeft = topLeft;
		this.topRight = topLeft.translate(size, 0, 0);
		this.bottomLeft = topLeft.translate(0, size, 0);
		this.bottomRight = topLeft.translate(size, size, 0);
	}

	edgeSize() {
		return this.topLeft.distance(this.topRight);
	}
}