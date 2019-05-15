import { boxPoint } from './box'
import { polygonEllipse } from './polygon'
import { lineEllipse } from './line'

/**
 * ellipse-line collision
 * adapted from http://csharphelper.com/blog/2017/08/calculate-where-a-line-segment-and-an-ellipse-intersect-in-c/
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rex radius-x of ellipse
 * @param {number} rey radius-y of ellipse
 * @param {number} x1 first point of line
 * @param {number} y1 first point of line
 * @param {number} x2 second point of line
 * @param {number} y2 second point of line
 */
export function ellipseLine(xe, ye, rex, rey, x1, y1, x2, y2)
{
    lineEllipse(x1, y1, x2, y2, xe, ye, rex, rey)
}

/**
 * ellipse-point collision
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {radius} rex radius-x of ellipse
 * @param {radius} rey radius-y of ellipse
 * @param {number} x1 point
 * @param {number} y1 point
 * @return {boolean}
 */
export function ellipsePoint(xe, ye, rex, rey, x1, y1)
{
    const x = Math.pow(x1 - xe, 2) / (rex * rex)
    const y = Math.pow(y1 - ye, 2) / (rey * rey)
    return x + y <= 1
}

/**
 * ellipse-box (axis-oriented rectangle) collision
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {radius} rex radius-x of ellipse
 * @param {radius} rey radius-y of ellipse
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 */
export function ellipseBox(xe, ye, rex, rey, xb, yb, wb, hb)
{
    return boxPoint(xb, yb, wb, hb, xe, ye) ||
        ellipseLine(xe, ye, rex, rey, xb, yb, xb + wb, yb) ||
        ellipseLine(xe, ye, rex, rey, xb, yb + hb, xb + wb, yb + hb) ||
        ellipseLine(xe, ye, rex, rey, xb, yb, xb, yb + hb) ||
        ellipseLine(xe, ye, rex, rey, xb + wb, yb, xb + wb, yb + hb)
}

/**
 * ellipse-polygon collision
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rex radius-x of ellipse
 * @param {number} rey radius-y of ellipse
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 */
export function ellipsePolygon(xe, ye, rex, rey, points)
{
    return polygonEllipse(points, xe, ye, rex, rey)
}

/**
 * ellipse-circle collision
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rex radius-x of ellipse
 * @param {number} rey radius-y of ellipse
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {number} rc radius of circle
 * @return {boolean}
 */
export function ellipseCircle(xe, ye, rex, rey, xc, yc, rc)
{
    if (!initialized)
    {
        initialize()
    }
    const x = Math.abs(xc - xe)
    const y = Math.abs(yc - ye)

    if (x * x + (rey - y) * (rey - y) <= rc * rc || (rex - x) * (rex - x) + y * y <= rc * rc || x * rey + y * rex <= rex * rey
        || ((x * rey + y * rex - rex * rey) * (x * rey + y * rex - rex * rey) <= rc * rc * (rex * rex + rey * rey) && x * rex - y * rey >= -rey * rey && x * rex - y * rey <= rex * rex))
    {
        return true
    }
    else
    {
        if ((x - rex) * (x - rex) + (y - rey) * (y - rey) <= rc * rc || (x <= rex && y - rc <= rey) || (y <= rey && x - rc <= rex))
        {
            return iterate(x, y, rex, 0, 0, rey, rc * rc)
        }
        return false
    }
}

/**
 * ellipse-ellipse collision
 * @param {number} x1 center of ellipse 1
 * @param {number} y1 center of ellipse 1
 * @param {number} r1x radius-x of ellipse 1
 * @param {number} r1y radius-y of ellipse 1
 * @param {number} x2 center of ellipse 2
 * @param {number} y2 center of ellipse 2
 * @param {number} r2x radius of ellipse 2
 * @param {number} r2y radius of ellipse 2
 * @return {boolean}
 */
export function ellipseEllipse(x1, y1, r1x, r1y, x2, y2, r2x, r2y)
{
    if (!initialized)
    {
        initialize()
    }

    var x = Math.abs(x2 - x1) * r2y
    var y = Math.abs(y2 - y1) * r2x
    r1x *= r2y
    r1y *= r2x
    var r = r2x * r2y

    if (x * x + (r1y - y) * (r1y - y) <= r * r || (r1x - x) * (r1x - x) + y * y <= r * r || x * r1y + y * r1x <= r1x * r1y
        || ((x * r1y + y * r1x - r1x * r1y) * (x * r1y + y * r1x - r1x * r1y) <= r * r * (r1x * r1x + r1y * r1y) && x * r1x - y * r1y >= -r1y * r1y && x * r1x - y * r1y <= r1x * r1x))
    {
        return true
    }
    else
    {
        if ((x - r1x) * (x - r1x) + (y - r1y) * (y - r1y) <= r * r || (x <= r1x && y - r <= r1y) || (y <= r1y && x - r <= r1x))
        {
            return iterate(x, y, r1x, 0, 0, r1y, r * r)
        }
        return false
    }
}

// helper functions

// from http://yehar.com/blog/?p=2926
let MAX_ITERATIONS = 10
let innerPolygonCoef, outerPolygonCoef, initialized

function initialize()
{
    innerPolygonCoef = []
    outerPolygonCoef = []
    for (var t = 0; t <= MAX_ITERATIONS; t++)
    {
        var numNodes = 4 << t
        innerPolygonCoef[t] = 0.5 / Math.cos(4 * Math.acos(0) / numNodes)
        outerPolygonCoef[t] = 0.5 / (Math.cos(2 * Math.acos(0) / numNodes) * Math.cos(2 * Math.acos(0) / numNodes))
    }
    initialized = true
}

function iterate(x, y, c0x, c0y, c2x, c2y, rr)
{
    for (var t = 1; t <= MAX_ITERATIONS; t++)
    {
        var c1x = (c0x + c2x) * innerPolygonCoef[t]
        var c1y = (c0y + c2y) * innerPolygonCoef[t]
        var tx = x - c1x
        var ty = y - c1y
        if (tx * tx + ty * ty <= rr)
        {
            return true
        }
        var t2x = c2x - c1x
        var t2y = c2y - c1y
        if (tx * t2x + ty * t2y >= 0 && tx * t2x + ty * t2y <= t2x * t2x + t2y * t2y &&
            (ty * t2x - tx * t2y >= 0 || rr * (t2x * t2x + t2y * t2y) >= (ty * t2x - tx * t2y) * (ty * t2x - tx * t2y)))
        {
            return true
        }
        var t0x = c0x - c1x
        var t0y = c0y - c1y
        if (tx * t0x + ty * t0y >= 0 && tx * t0x + ty * t0y <= t0x * t0x + t0y * t0y &&
            (ty * t0x - tx * t0y <= 0 || rr * (t0x * t0x + t0y * t0y) >= (ty * t0x - tx * t0y) * (ty * t0x - tx * t0y)))
        {
            return true
        }
        var c3x = (c0x + c1x) * outerPolygonCoef[t]
        var c3y = (c0y + c1y) * outerPolygonCoef[t]
        if ((c3x - x) * (c3x - x) + (c3y - y) * (c3y - y) < rr)
        {
            c2x = c1x
            c2y = c1y
            continue
        }
        var c4x = c1x - c3x + c1x
        var c4y = c1y - c3y + c1y
        if ((c4x - x) * (c4x - x) + (c4y - y) * (c4y - y) < rr)
        {
            c0x = c1x
            c0y = c1y
            continue
        }
        var t3x = c3x - c1x
        var t3y = c3y - c1y
        if (ty * t3x - tx * t3y <= 0 || rr * (t3x * t3x + t3y * t3y) > (ty * t3x - tx * t3y) * (ty * t3x - tx * t3y))
        {
            if (tx * t3x + ty * t3y > 0)
            {
                if (Math.abs(tx * t3x + ty * t3y) <= t3x * t3x + t3y * t3y || (x - c3x) * (c0x - c3x) + (y - c3y) * (c0y - c3y) >= 0)
                {
                    c2x = c1x
                    c2y = c1y
                    continue
                }
            } else if (-(tx * t3x + ty * t3y) <= t3x * t3x + t3y * t3y || (x - c4x) * (c2x - c4x) + (y - c4y) * (c2y - c4y) >= 0)
            {
                c0x = c1x
                c0y = c1y
                continue
            }
        }
        return false
    }
    return false // Out of iterations so it is unsure if there was a collision. But have to return something.
}