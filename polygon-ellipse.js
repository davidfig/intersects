var polygonPoint = require('./polygon-point')
var lineEllipse = require('./line-ellipse')

/**
 * polygon-ellipse collision
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rex radius-x of ellipse
 * @param {number} rey radius-y of ellipse
 */
module.exports = function polygonEllipse(points, xe, ye, rex, rey)
{
    if (polygonPoint(points, xe, ye))
    {
        return true
    }
    var count = points.length
    for (var i = 0; i < count - 2; i += 2)
    {
        if (lineEllipse(points[i], points[i + 1], points[i + 2], points[i + 3], xe, ye, rex, rey))
        {
            return true
        }
    }
    return lineEllipse(points[0], points[1], points[count - 2], points[count - 1], xe, ye, rex, rey)
}