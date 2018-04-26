'use strict'

var polygonPoint = require('./polygon-point')

/**
 * point-polygon collision
 * @param {number} x1
 * @param {number} y1
 * @param {number[]} points
 * @return {boolean}
 */
module.exports = function pointPolygon(x1, y1, points)
{
    return polygonPoint(points, x1, y1)
}
