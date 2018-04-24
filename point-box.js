'use strict'

var boxPoint = require('./box-point')

/**
 * point-box collision
 * @param {number} x1 point
 * @param {number} y1 point
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 * @return {boolean}
 */
module.exports = function pointBox(x1, y1, xb, yb, wb, hb)
{
    return boxPoint(xb, yb, wb, hb, x1, y1)
}
