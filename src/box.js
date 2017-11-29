const Line = require('./line')
const Polygon = require('./polygon')
const Circle = require('./circle')

/**
 * box-point collision
 * @param {number} x1 top-left corner of box
 * @param {number} y1 top-left corner of box
 * @param {number} w1 width of box
 * @param {number} h1 height of box
 * @param {number} x2 of point
 * @param {number} y2 of point
 * @return {boolean}
 */
function boxPoint(x1, y1, w1, h1, x2, y2)
{
    return x2 >= x1 && x2 <= x1 + w1 && y2 >= y1 && y2 <= y1 + h1
}

/**
 * box-box collision
 * @param {number} x1 top-left corner of first box
 * @param {number} y1 top-left corner of first box
 * @param {number} w1 width of first box
 * @param {number} h1 height of first box
 * @param {number} x2 top-left corner of second box
 * @param {number} y2 top-left corner of second box
 * @param {number} w2 width of second box
 * @param {number} h2 height of second box
 */
function boxBox(x1, y1, w1, h1, x2, y2, w2, h2)
{
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2
}

/**
 * box-line collision
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 * @param {number} x1 first point of line
 * @param {number} y1 first point of line
 * @param {number} x2 second point of line
 * @param {number} y2 second point of line
 */
function boxLine(xb, yb, wb, hb, x1, y1, x2, y2)
{
    return Line.lineBox(x1, y1, x2, y2, xb, yb, wb, hb)
}

/**
 * box-polygon collision
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 * @param {number[]} points of polygon
 */
function boxPolygon(xb, yb, wb, hb, points)
{
    return Polygon.polygonBox(points, xb, yb, wb, hb)
}

/**
 * box-circle collision
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {number} rc radius of circle
 */
function boxCircle(xb, yb, wb, hb, xc, yc, rc)
{
    return Circle.circleBox(xc, yc, rc, xb, yb, wb, hb)
}

module.exports = {
    boxPoint,
    boxBox,
    boxLine,
    boxPolygon,
    boxCircle
}