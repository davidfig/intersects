import { lineCircle, linePoint, linePolygon, lineEllipse } from './import'

/**
 * polygon-box collision
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} x of box
 * @param {number} y of box
 * @param {number} w of box
 * @param {number} h of box
 */
export function polygonBox(points, x, y, w, h)
{
    var points2 = [x, y, x + w, y, x + w, y + h, x, y + h]
    return polygonPolygon(points, points2)
}

/**
 * polygon-polygon collision
 * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
 * @param {number[]} points1 [x1, y1, x2, y2, ... xn, yn] of first polygon
 * @param {number[]} points2 [x1, y1, x2, y2, ... xn, yn] of second polygon
 * @return {boolean}
 */
export function polygonPolygon(points1, points2)
{
    const a = points1
    const b = points2
    const polygons = [a, b]
    let minA, maxA, projected, minB, maxB, j
    for (let i = 0; i < polygons.length; i++)
    {
        const polygon = polygons[i]
        for (let i1 = 0; i1 < polygon.length; i1 += 2)
        {
            const i2 = (i1 + 2) % polygon.length
            const normal = { x: polygon[i2 + 1] - polygon[i1 + 1], y: polygon[i1] - polygon[i2] }
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

/**
 * polygon-point collision
 * based on https://stackoverflow.com/a/17490923/1955997
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} x of point
 * @param {number} y of point
 * @param {number} [tolerance=1] maximum distance of point to polygon's edges that triggers collision (see pointLine)
 */
export function polygonPoint(points, x, y, tolerance)
{
    const length = points.length
    let c = false
    let i, j
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

/**
 * polygon-line collisions
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} x1 first point in line
 * @param {number} y1 first point in line
 * @param {number} x2 second point in line
 * @param {number} y2 second point in line
 * @param {tolerance=1} maximum distance of point to polygon's edges that triggers collision (see pointLine)
 * @return {boolean}
 */
export function polygonLine(points, x1, y1, x2, y2, tolerance)
{
    return linePolygon(x1, y1, x2, y2, points, tolerance)
}

/**
 * polygon-ellipse collision
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rex radius-x of ellipse
 * @param {number} rey radius-y of ellipse
 */
export function polygonEllipse(points, xe, ye, rex, rey)
{
    if (polygonPoint(points, xe, ye))
    {
        return true
    }
    const count = points.length
    for (let i = 0; i < count - 2; i += 2)
    {
        if (lineEllipse(points[i], points[i + 1], points[i + 2], points[i + 3], xe, ye, rex, rey))
        {
            return true
        }
    }
    return lineEllipse(points[0], points[1], points[count - 2], points[count - 1], xe, ye, rex, rey)
}

/**
 * polygon-circle collision
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {number} rc radius of circle
 */
export function polygonCircle(points, xc, yc, rc)
{
    if (polygonPoint(points, xc, yc))
    {
        return true
    }
    const count = points.length
    for (let i = 0; i < count - 2; i += 2)
    {
        if (lineCircle(points[i], points[i + 1], points[i + 2], points[i + 3], xc, yc, rc))
        {
            return true
        }
    }
    return lineCircle(points[0], points[1], points[count - 2], points[count - 1], xc, yc, rc)
}