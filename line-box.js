'use strict'

var boxPoint = require('./box-point')
var lineLine = require('./line-line')

/**
 * line-box collision
 number @param {number} x1 point 1 of line
 number @param {number} y1 point 1 of line
 number @param {number} x2 point 2 of line
 number @param {number} y2 point 2 of line
 number @param {number} xb top-left of box
 number @param {number} yb top-left of box
 number @param {number} wb width of box
 number @param {number} hb height of box
 */
module.exports = function lineBox(x1, y1, x2, y2, xb, yb, wb, hb)
{
    if (boxPoint(xb, yb, wb, hb, x1, y1) || boxPoint(xb, yb, wb, hb, x2, y2))
    {
        return true
    }
    return lineLine(x1, y1, x2, y2, xb, yb, xb + wb, yb) ||
        lineLine(x1, y1, x2, y2, xb + wb, yb, xb + wb, yb + hb) ||
        lineLine(x1, y1, x2, y2, xb, yb + hb, xb + wb, yb + hb) ||
        lineLine(x1, y1, x2, y2, xb, yb, xb, yb + hb)
}
