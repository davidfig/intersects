'use strict'

var polygonPolygon = require('./polygon-polygon')

/**
 * polygon-box collision
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} x of box
 * @param {number} y of box
 * @param {number} w of box
 * @param {number} h of box
 */
module.exports = function polygonBox(points, x, y, w, h)
{
    var points2 = [x, y, x + w, y, x + w, y + h, x, y + h]
    return polygonPolygon(points, points2)
}
