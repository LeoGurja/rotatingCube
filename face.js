import context, { canvas } from './index.js'
import Point from './point.js'
import randomColor from './randomColor.js'

const TOP_LEFT = 0
const TOP_RIGHT = 1
const BOTTOM_LEFT = 2
const BOTTOM_RIGHT = 3

export default class Face {
	constructor(topLeft, topRight, bottomLeft, bottomRight) {
		this.points = [
			topLeft,
			topRight,
			bottomLeft,
			bottomRight
		]
		this.color = randomColor()
	}

	async update(rotateSpeed) {
		this.points.forEach((point) => {
			point.rotate(
				rotateSpeed[0],
				rotateSpeed[1],
				rotateSpeed[2]
			)
		})
	}

	async render(position) {
		context.fillStyle = this.color
		context.beginPath()
		this.drawEdge(TOP_LEFT, position)
		this.drawEdge(TOP_RIGHT, position)
		this.drawEdge(BOTTOM_RIGHT, position)
		this.drawEdge(BOTTOM_LEFT, position)
		context.closePath()
		context.stroke()
		context.fill()
	}

	collide(position) {
		/**
		 * @param position the position of the cube
		 * @return the ammount passed from the walls limits for each direction
		 */

		let top = 0
		let bottom = 0
		let right = 0
		let left = 0
		this.points.some((point) => {
			if (point.x + position[0] <= 0) {
				left = point.x + position[0]
			} else if (point.x + position[0] >= canvas.width) {
				right = point.x + position[0] - canvas.width
			}
			if (point.y + position[1] <= 0) {
				top = point.y + position[1]
			} else if (point.y + position[1] >= canvas.height) {
				bottom = point.y + position[1] - canvas.height
			}
			return top || right || left || bottom
		})
		return { top, bottom, left, right }
	}

	averageZ() {
		let acc = 0
		this.points.forEach((point) => {
			acc += point.z
		})
		return acc / 4
	}

	drawEdge(endpoint, position) {
		context.lineTo(
			this.points[endpoint].x + position[0],
			this.points[endpoint].y + position[1]
		)
	}

	static createFromSize(topLeft, size) {
		return new Face(
			topLeft,
			Point.translate(topLeft, size, 0, 0),
			Point.translate(topLeft, 0, size, 0),
			Point.translate(topLeft, size, size, 0)
		)
	}

	static linkFaces(frontFace, backFace) {
		return [
			new Face(
				frontFace.points[TOP_LEFT],
				backFace.points[TOP_LEFT],
				frontFace.points[BOTTOM_LEFT],
				backFace.points[BOTTOM_LEFT]
			),
			new Face(
				frontFace.points[TOP_RIGHT],
				backFace.points[TOP_RIGHT],
				frontFace.points[BOTTOM_RIGHT],
				backFace.points[BOTTOM_RIGHT]
			),
			new Face(
				frontFace.points[TOP_LEFT],
				frontFace.points[TOP_RIGHT],
				backFace.points[TOP_LEFT],
				backFace.points[TOP_RIGHT]
			),
			new Face(
				frontFace.points[BOTTOM_LEFT],
				frontFace.points[BOTTOM_RIGHT],
				backFace.points[BOTTOM_LEFT],
				backFace.points[BOTTOM_RIGHT]
			)
		]
	}

	static TranslateZ(face, dz) {
		return new Face(
			Point.translateZ(face.points[TOP_LEFT], dz),
			Point.translateZ(face.points[TOP_RIGHT], dz),
			Point.translateZ(face.points[BOTTOM_LEFT], dz),
			Point.translateZ(face.points[BOTTOM_RIGHT], dz)
		)
	}
}
