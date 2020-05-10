var polygonPoint = require('./polygon-point')
var lineCircle = require('./line-circle')

/**
 * polygon-circle collision
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {number} rc radius of circle
 * @param {number} [tolerance=1] maximum distance of point to polygon's edges that triggers collision (see pointLine)
 */
module.exports = function polygonCircle(points, xc, yc, rc, tolerance)
{
    if (polygonPoint(points, xc, yc, tolerance))
    {
        return true
    }
    var count = points.length
    for (var i = 0; i < count - 2; i += 2)
    {
        if (lineCircle(points[i], points[i + 1], points[i + 2], points[i + 3], xc, yc, rc))
        {
            return true
        }
    }
    return lineCircle(points[0], points[1], points[count - 2], points[count - 1], xc, yc, rc)
}
