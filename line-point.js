'use strict'

function distanceSquared(x1, y1, x2, y2)
{
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

/**
 * line-point collision
 * from https://stackoverflow.com/a/17693146/1955997
 * @param {number} x1 first point in line
 * @param {number} y1 first point in line
 * @param {number} x2 second point in line
 * @param {number} y2 second point in line
 * @param {number} xp point
 * @param {number} yp point
 * @param {number} [tolerance=1]
 * @return {boolean}
 */
module.exports = function linePoint(x1, y1, x2, y2, xp, yp, tolerance)
{
    tolerance = tolerance || 1
    return Math.abs(distanceSquared(x1, y1, x2, y2) - (distanceSquared(x1, y1, xp, yp) + distanceSquared(x2, y2, xp, yp))) <= tolerance
}