const Polygon = require('./polygon')
const Line = require('./line')
const Box = require('./box')

/**
 * circle-point collision
 * @param {number} x1 center of circle
 * @param {number} y1 center of circle
 * @param {radius} r1 radius of circle
 * @param {number} x2 point
 * @param {number} y2 point
 * @return {boolean}
 */
function circlePoint(x1, y1, r1, x2, y2)
{
    const x = x2 - x1
    const y = y2 - y1
    return x * x + y * y <= r1 * r1
}

/**
 * circle-circle collision
 * @param {number} x1 center of circle 1
 * @param {number} y1 center of circle 1
 * @param {number} r1 radius of circle 1
 * @param {number} x2 center of circle 2
 * @param {number} y2 center of circle 2
 * @param {number} r2 radius of circle 2
 * @return {boolean}
 */
function circleCircle(x1, y1, r1, x2, y2, r2)
{
    const x = x1 - x2
    const y = y2 - y1
    const radii = r1 + r2
    return x * x + y * y <= radii * radii
}

/**
 * circle-line collision
 * from http://stackoverflow.com/a/10392860/1955997
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} x1 first point of line
 * @param {number} y1 first point of line
 * @param {number} x2 second point of line
 * @param {number} y2 second point of line
 * @return {boolean}
 */
function circleLine(xc, yc, rc, x1, y1, x2, y2)
{
    return Line.lineCircle(x1, y1, x2, y2, xc, yc, rc)
}

/**
 * circle-box (axis-oriented rectangle) collision
 * from http://stackoverflow.com/a/402010/1955997
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} xb top-left corner of rectangle
 * @param {number} yb top-left corner of rectangle
 * @param {number} wb width of rectangle
 * @param {number} hb height of rectangle
 */
function circleBox(xc, yc, rc, xb, yb, wb, hb)
{
    return Box.boxCircle(xb, yb, wb, hb, xc, yc, rc)
}

/**
 * circle-polygon collision
 * from http://stackoverflow.com/a/402019/1955997
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 */
function circlePolygon(xc, yc, rc, points)
{
    return Polygon.polygonCircle(points, xc, yc, rc)
}

module.exports = {
    circlePoint,
    circleCircle,
    circleLine,
    circleBox,
    circlePolygon
}