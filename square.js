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

    update(speed, rotate_speed) {
        this.points.forEach(point => {
            point.translate(speed[0], speed[1], 0)
            point.rotate(rotate_speed[0], rotate_speed[1], rotate_speed[2])
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

    render() {
        context.strokeStyle = '#000000'
        context.fillStyle = this.color
        context.lineWidth = 2
        context.lineJoin = context.lineCap = 'round'
        context.beginPath()
        context.moveTo(this.topLeft.x, this.topLeft.y)
        context.lineTo(this.topRight.x, this.topRight.y)
        context.lineTo(this.bottomRight.x, this.bottomRight.y)
        context.lineTo(this.bottomLeft.x, this.bottomLeft.y)
        context.lineTo(this.topLeft.x, this.topLeft.y)
        context.closePath()
        context.stroke()
        context.fill()
    }
}