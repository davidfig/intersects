'use strict'

var linePolygon = require('./line-polygon')

/**
 * polygon-line collisions
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} x1 first point in line
 * @param {number} y1 first point in line
 * @param {number} x2 second point in line
 * @param {number} y2 second point in line
 * @return {boolean}
 */
module.exports = function polygonLine(points, x1, y1, x2, y2)
{
    return linePolygon(x1, y1, x2, y2, points)
}
