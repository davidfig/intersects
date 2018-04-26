'use strict'


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
module.exports = function circleCircle(x1, y1, r1, x2, y2, r2)
{
    var x = x1 - x2
    var y = y2 - y1
    var radii = r1 + r2
    return x * x + y * y <= radii * radii
}
