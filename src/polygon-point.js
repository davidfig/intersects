'use strict'

const linePoint = require('./line-point')

/**
 * polygon-point collision
 * based on https://stackoverflow.com/a/17490923/1955997
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} x of point
 * @param {number} y of point
 * @param {number} [tolerance=1] maximum distance of point to polygon's edges that triggers collision (see pointLine)
 */
module.exports = function polygonPoint(points, x, y, tolerance)
{
    var length = points.length
    var c = false
    var i, j
    for (i = 0, j = length - 2; i < length; i += 2)
    {
        if (((points[i + 1] > y) !== (points[j + 1] > y)) && (x < (points[j] - points[i]) * (y - points[i + 1]) / (points[j + 1] - points[i + 1]) + points[i]))
        {
            c = !c
        }
        j = i
    }
    if (c)
    {
        return true
    }
    for (i = 0; i < length; i += 2)
    {
        var p1x = points[i]
        var p1y = points[i + 1]
        var p2x, p2y
        if (i === length - 2)
        {
            p2x = points[0]
            p2y = points[1]
        }
        else
        {
            p2x = points[i + 2]
            p2y = points[i + 3]
        }
        if (linePoint(p1x, p1y, p2x, p2y, x, y, tolerance))
        {
            return true
        }
    }
    return false
}
