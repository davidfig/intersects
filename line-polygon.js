var polygonPoint = require('./polygon-point')
var lineLine = require('./lineToLine')

/**
 * line-polygon collision
 @param {number} x1 point 1 of line
 @param {number} y1 point 1 of line
 @param {number} x2 point 2 of line
 @param {number} y2 point 2 of line
 @param {number[]} points of polygon
 @param {tolerance=1} maximum distance of point to polygon's edges that triggers collision (see pointLine)
 */
module.exports = function linePolygon(x1, y1, x2, y2, points, tolerance)
{
    var length = points.length

    // check if first point is inside the shape (this covers if the line is completely enclosed by the shape)
    if (polygonPoint(points, x1, y1, tolerance))
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
