'use strict'

var polygonBox = require('./polygon-box')

/**
 * box-polygon collision
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 * @param {number[]} points of polygon
 */
module.exports = function boxPolygon(xb, yb, wb, hb, points)
{
    return polygonBox(points, xb, yb, wb, hb)
}
