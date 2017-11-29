const Circle = require('./src/circle')
const Polygon = require('./src/polygon')
const Box = require('./src/box')
const Line = require('./src/line')
const Point = require('./src/point')

module.exports = {
    circlePoint: Circle.circlePoint,
    circleCircle: Circle.circleCircle,
    circleLine: Circle.circleLine,
    circleBox: Circle.circleBox,
    circlePolygon: Circle.circlePolygon,

    polygonPoint: Polygon.polygonPoint,
    polygonLine: Polygon.polygonLine,
    polygonPolygon: Polygon.polygonPolygon,
    polygonBox: Polygon.polygonBox,
    polygonCircle: Polygon.polygonCircle,

    boxPoint: Box.boxPoint,
    boxBox: Box.boxBox,
    boxLine: Box.boxLine,
    boxPolygon: Box.boxPolygon,
    boxCircle: Box.boxCircle,

    pointBox: Point.pointBox,
    pointPolygon: Point.pointPolygon,
    pointCircle: Point.pointCircle,

    lineLine: Line.lineLine,
    lineBox: Line.lineBox,
    linePolygon: Line.linePolygon,
    lineCircle: Line.lineCircle
}