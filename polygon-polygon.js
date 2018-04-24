'use strict'

/**
 * polygon-polygon collision
 * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
 * @param {number[]} points1 [x1, y1, x2, y2, ... xn, yn] of first polygon
 * @param {number[]} points2 [x1, y1, x2, y2, ... xn, yn] of second polygon
 * @return {boolean}
 */
module.exports = function polygonPolygon(points1, points2)
{
    var a = points1
    var b = points2
    var polygons = [a, b]
    var minA, maxA, projected, minB, maxB, j
    for (var i = 0; i < polygons.length; i++)
    {
        var polygon = polygons[i]
        for (var i1 = 0; i1 < polygon.length; i1 += 2)
        {
            var i2 = (i1 + 2) % polygon.length
            var normal = { x: polygon[i2 + 1] - polygon[i1 + 1], y: polygon[i1] - polygon[i2] }
            minA = maxA = null
            for (j = 0; j < a.length; j += 2)
            {
                projected = normal.x * a[j] + normal.y * a[j + 1]
                if (minA === null || projected < minA)
                {
                    minA = projected
                }
                if (maxA === null || projected > maxA)
                {
                    maxA = projected
                }
            }
            minB = maxB = null
            for (j = 0; j < b.length; j += 2)
            {
                projected = normal.x * b[j] + normal.y * b[j + 1]
                if (minB === null || projected < minB)
                {
                    minB = projected
                }
                if (maxB === null || projected > maxB)
                {
                    maxB = projected
                }
            }
            if (maxA < minB || maxB < minA)
            {
                return false
            }
        }
    }
    return true
}
