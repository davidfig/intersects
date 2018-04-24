'use strict'

var lineBox = require('./line-box')

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
module.exports = function boxLine(xb, yb, wb, hb, x1, y1, x2, y2)
{
    return lineBox(x1, y1, x2, y2, xb, yb, wb, hb)
}
