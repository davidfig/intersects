'use strict'

var boxCircle = require('./box-circle')

/**
 * circle-box (axis-oriented rectangle) collision
 * from http://stackoverflow.com/a/402010/1955997
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} xb top-left corner of rectangle
 * @param {number} yb top-left corner of rectangle
 * @param {number} wb width of rectangle
 * @param {number} hb height of rectangle
 */
module.exports = function circleBox(xc, yc, rc, xb, yb, wb, hb)
{
    return boxCircle(xb, yb, wb, hb, xc, yc, rc)
}
