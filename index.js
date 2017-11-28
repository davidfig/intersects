const Circle = require('./src/circle')
const Polygon = require('./src/polygon')
const Box = require('./src/box')
const Line = require('./src/line')

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

    boxPoint: Box.boxPoint,
    boxBox: Box.boxBox,

    lineLine: Line.lineLine,
    lineBox: Line.lineBox
}