import { polygonPolygon, polygonPoint } from './import'
import { boxPoint } from './import'

/**
 * line-ellipse collision
 * @param {number} x1 first point of line
 * @param {number} y1 first point of line
 * @param {number} x2 second point of line
 * @param {number} y2 second point of line
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rx radius-x of ellipse
 * @param {number} ry radius-y of ellipse
 */
export function lineEllipse(x1, y1, x2, y2, xe, ye, rex, rey)
{
    x1 -= xe
    x2 -= xe
    y1 -= ye
    y2 -= ye

    const A = Math.pow(x2 - x1, 2) / rex / rex + Math.pow(y2 - y1, 2) / rey / rey
    const B = 2 * x1 * (x2 - x1) / rex / rex + 2 * y1 * (y2 - y1) / rey / rey
    const C = x1 * x1 / rex / rex + y1 * y1 / rey / rey - 1
    const D = B * B - 4 * A * C
    if (D === 0)
    {
        const t = -B / 2 / A
        return t >= 0 && t <= 1
    }
    else if (D > 0)
    {
        const sqrt = Math.sqrt(D)
        const t1 = (-B + sqrt) / 2 / A
        const t2 = (-B - sqrt) / 2 / A
        return (t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1)
    }
    else
    {
        return false
    }
}

/**
 * line-line collision
 * from http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
 * @param {number} x1 first point in line 1
 * @param {number} y1 first point in line 1
 * @param {number} x2 second point in line 1
 * @param {number} y2 second point in line 1
 * @param {number} x3 first point in line 2
 * @param {number} y3 first point in line 2
 * @param {number} x4 second point in line 2
 * @param {number} y4 second point in line 2
 * @param {number} [thickness1] of line 1 (the line is centered in its thickness--see demo)
 * @param {number} [thickness2] of line 2 (the line is centered in its thickness--see demo)
 * @return {boolean}
 */
export function lineLine(x1, y1, x2, y2, x3, y3, x4, y4, thickness1, thickness2)
{
    if (thickness1 || thickness2)
    {
        return lineLineThickness(x1, y1, x2, y2, x3, y3, x4, y4, thickness1, thickness2)
    }
    var s1_x = x2 - x1
    var s1_y = y2 - y1
    var s2_x = x4 - x3
    var s2_y = y4 - y3
    var s = (-s1_y * (x1 - x3) + s1_x * (y1 - y3)) / (-s2_x * s1_y + s1_x * s2_y)
    var t = (s2_x * (y1 - y3) - s2_y * (x1 - x3)) / (-s2_x * s1_y + s1_x * s2_y)
    return s >= 0 && s <= 1 && t >= 0 && t <= 1
}

/**
 * line-point collision
 * from https://stackoverflow.com/a/17693146/1955997
 * @param {number} x1 first point in line
 * @param {number} y1 first point in line
 * @param {number} x2 second point in line
 * @param {number} y2 second point in line
 * @param {number} xp point
 * @param {number} yp point
 * @param {number} [tolerance=1]
 * @return {boolean}
 */
export function linePoint(x1, y1, x2, y2, xp, yp, tolerance)
{
    tolerance = tolerance || 1
    return Math.abs(distanceSquared(x1, y1, x2, y2) - (distanceSquared(x1, y1, xp, yp) + distanceSquared(x2, y2, xp, yp))) <= tolerance
}

/**
 * line-polygon collision
 @param {number} x1 point 1 of line
 @param {number} y1 point 1 of line
 @param {number} x2 point 2 of line
 @param {number} y2 point 2 of line
 @param {number[]} points of polygon
 @param {tolerance=1} maximum distance of point to polygon's edges that triggers collision (see pointLine)
 */
export function linePolygon(x1, y1, x2, y2, points, tolerance)
{
    const length = points.length

    // check if first point is inside the shape (this covers if the line is completely enclosed by the shape)
    if (polygonPoint(points, x1, y1, tolerance))
    {
        return true
    }

    // check for intersections for all of the sides
    for (let i = 0; i < length; i += 2)
    {
        const j = (i + 2) % length
        if (lineLine(x1, y1, x2, y2, points[i], points[i + 1], points[j], points[j + 1]))
        {
            return true
        }
    }
    return false
}

/**
 * turns a line into a polygon using thickness
 * @param {number} x1 first point of line
 * @param {number} y1 first point of line
 * @param {number} x2 second point of line
 * @param {number} y2 second point of line
 * @param {number} thickness of line
 */
export function lineToPolygon(x1, y1, x2, y2, thickness)
{
    const angle = Math.atan2(y2 - y1, x2 - x1) - Math.PI / 2
    const half = thickness / 2
    const cos = Math.cos(angle) * half
    const sin = Math.sin(angle) * half
    return [
        x1 - cos, y1 - sin,
        x2 - cos, y2 - sin,
        x2 + cos, y2 + sin,
        x1 + cos, y1 + sin
    ]
}

/**
 * line-circle collision
 * @param {number} x1 point 1 of line
 * @param {number} y1 point 1 of line
 * @param {number} x2 point 2 of line
 * @param {number} y2 point 2 of line
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {number} rc radius of circle
 */
export function lineCircle(x1, y1, x2, y2, xc, yc, rc)
{
    var ac = [xc - x1, yc - y1]
    var ab = [x2 - x1, y2 - y1]
    var ab2 = dot(ab, ab)
    var acab = dot(ac, ab)
    var t = acab / ab2
    t = (t < 0) ? 0 : t
    t = (t > 1) ? 1 : t
    var h = [(ab[0] * t + x1) - xc, (ab[1] * t + y1) - yc]
    var h2 = dot(h, h)
    return h2 <= rc * rc
}

/**
 * line-box collision
 number @param {number} x1 point 1 of line
 number @param {number} y1 point 1 of line
 number @param {number} x2 point 2 of line
 number @param {number} y2 point 2 of line
 number @param {number} xb top-left of box
 number @param {number} yb top-left of box
 number @param {number} wb width of box
 number @param {number} hb height of box
 */
export function lineBox(x1, y1, x2, y2, xb, yb, wb, hb)
{
    if (boxPoint(xb, yb, wb, hb, x1, y1) || boxPoint(xb, yb, wb, hb, x2, y2))
    {
        return true
    }
    return lineLine(x1, y1, x2, y2, xb, yb, xb + wb, yb) ||
        lineLine(x1, y1, x2, y2, xb + wb, yb, xb + wb, yb + hb) ||
        lineLine(x1, y1, x2, y2, xb, yb + hb, xb + wb, yb + hb) ||
        lineLine(x1, y1, x2, y2, xb, yb, xb, yb + hb)
}

// helper functions

function lineLineThickness(x1, y1, x2, y2, x3, y3, x4, y4, thickness1, thickness2)
{
    if (thickness1 && thickness2)
    {
        return polygonPolygon(lineToPolygon(x1, y1, x2, y2, thickness1), lineToPolygon(x3, y3, x4, y4, thickness2))
    }
    else if (thickness1)
    {
        return linePolygon(x3, y3, x4, y4, lineToPolygon(x1, y1, x2, y2, thickness1))
    }
    else if (thickness2)
    {
        return linePolygon(x1, y1, x2, y2, lineToPolygon(x3, y3, x4, y4, thickness1))
    }
}

function distanceSquared(x1, y1, x2, y2)
{
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

function dot(v1, v2)
{
    return (v1[0] * v2[0]) + (v1[1] * v2[1])
}