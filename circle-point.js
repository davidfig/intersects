'use strict'

/**
 * circle-point collision
 * @param {number} x1 center of circle
 * @param {number} y1 center of circle
 * @param {radius} r1 radius of circle
 * @param {number} x2 point
 * @param {number} y2 point
 * @return {boolean}
 */
module.exports = function circlePoint(x1, y1, r1, x2, y2)
{
    var x = x2 - x1
    var y = y2 - y1
    return x * x + y * y <= r1 * r1
}
