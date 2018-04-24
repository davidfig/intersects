'use strict'

var polygonCircle = require('./polygon-circle')

/**
 * circle-polygon collision
 * from http://stackoverflow.com/a/402019/1955997
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 */
module.exports = function circlePolygon(xc, yc, rc, points)
{
    return polygonCircle(points, xc, yc, rc)
}
