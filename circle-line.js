'use strict'

var lineCircle = require('./line-circle')

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
module.exports = function circleLine(xc, yc, rc, x1, y1, x2, y2)
{
    return lineCircle(x1, y1, x2, y2, xc, yc, rc)
}
