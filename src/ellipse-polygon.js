var polygonEllipse = require('./polygon-ellipse')

/**
 * ellipse-polygon collision
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rex radius-x of ellipse
 * @param {number} rey radius-y of ellipse
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 */
module.exports = function ellipsePolygon(xe, ye, rex, rey, points)
{
    return polygonEllipse(points, xe, ye, rex, rey)
}