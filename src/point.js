const Box = require('./box')
const Polygon = require('./polygon')
const Circle = require('./circle')

/**
 * point-box collision
 * @param {number} x1 point
 * @param {number} y1 point
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 * @return {boolean}
 */
function pointBox(x1, y1, xb, yb, wb, hb)
{
    return Box.boxPoint(xb, yb, wb, hb, x1, y1)
}

/**
 * point-polygon collision
 * @param {number} x1
 * @param {number} y1
 * @param {number[]} points
 * @return {boolean}
 */
function pointPolygon(x1, y1, points)
{
    return Polygon.polygonPoint(points, x1, y1)
}

function pointCircle(x1, y1, xc, yc, rc)
{
    return Circle.circlePoint(xc, yc, rc, x1, y1)
}

module.exports = {
    pointBox,
    pointPolygon,
    pointCircle
}