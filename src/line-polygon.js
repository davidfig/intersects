'use strict'

var polygonPoint = require('./polygon-point')
var lineLine = require('./line-line')

/**
 * line-polygon collision
 number @param {number} x1 point 1 of line
 number @param {number} y1 point 1 of line
 number @param {number} x2 point 2 of line
 number @param {number} y2 point 2 of line
 number @param {number[]} points of polygon
 */
module.exports = function linePolygon(x1, y1, x2, y2, points)
{
    var length = points.length

    // check if first point is inside the shape (this covers if the line is completely enclosed by the shape)
    if (polygonPoint(points, x1, y1))
    {
        return true
    }

    // check for intersections for all of the sides
    for (var i = 0; i < length; i += 2)
    {
        var j = (i + 2) % length
        if (lineLine(x1, y1, x2, y2, points[i], points[i + 1], points[j], points[j + 1]))
        {
            return true
        }
    }
    return false
}
