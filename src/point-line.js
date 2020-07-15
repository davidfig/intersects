'use strict'

var linePoint = require('./line-point')

/**
 * point-line collision
 * @param {number} xp point
 * @param {number} yp point
 * @param {number} x1 first point in line
 * @param {number} y1 first point in line
 * @param {number} x2 second point in line
 * @param {number} y2 second point in line
 * @return {boolean}
 */
module.exports = function pointLine(xp, yp, x1, y1, x2, y2)
{
    return linePoint(x1, y1, x2, y2, xp, yp)
}
