import { polygonBox, lineBox, ellipseBox, circleOutlineBox } from './import'

/**
 * box-box collision
 * @param {number} x1 top-left corner of first box
 * @param {number} y1 top-left corner of first box
 * @param {number} w1 width of first box
 * @param {number} h1 height of first box
 * @param {number} x2 top-left corner of second box
 * @param {number} y2 top-left corner of second box
 * @param {number} w2 width of second box
 * @param {number} h2 height of second box
 */
export function boxBox(x1, y1, w1, h1, x2, y2, w2, h2)
{
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2
}

/**
 * box-polygon collision
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 * @param {number[]} points of polygon
 */
export function boxPolygon(xb, yb, wb, hb, points)
{
    return polygonBox(points, xb, yb, wb, hb)
}

/**
 * box-point collision
 * @param {number} x1 top-left corner of box
 * @param {number} y1 top-left corner of box
 * @param {number} w1 width of box
 * @param {number} h1 height of box
 * @param {number} x2 of point
 * @param {number} y2 of point
 * @return {boolean}
 */
export function boxPoint(x1, y1, w1, h1, x2, y2)
{
    return x2 >= x1 && x2 <= x1 + w1 && y2 >= y1 && y2 <= y1 + h1
}

/**
 * box-line collision
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 * @param {number} x1 first point of line
 * @param {number} y1 first point of line
 * @param {number} x2 second point of line
 * @param {number} y2 second point of line
 */
export function boxLine(xb, yb, wb, hb, x1, y1, x2, y2)
{
    return lineBox(x1, y1, x2, y2, xb, yb, wb, hb)
}

/**
 * box-ellipse (axis-oriented rectangle) collision
 * @param {number} xb top-left corner of rectangle
 * @param {number} yb top-left corner of rectangle
 * @param {number} wb width of rectangle
 * @param {number} hb height of rectangle
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {radius} rex radius-x of ellipse
 * @param {radius} rey radius-y of ellipse
 */
export function boxEllipse(xb, yb, wb, hb, xe, ye, rex, rey)
{
    return ellipseBox(xe, ye, rex, rey, xb, yb, wb, hb)
}

/**
 * circleOutline-box (axis-aligned) collision
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} x top-left corner of box
 * @param {number} y top-left corner of box
 * @param {number} width of box
 * @param {number} height of box
 * @param {number} thickness of circle outline
 */
module.exports = function boxCircleOutline(x, y, width, height, xc, yc, rc, thickness)
{
    return circleOutlineBox(xc, yc, rc, x, y, width, height, thickness)
}

/**
 * box-circle collision
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {number} rc radius of circle
 */
export function boxCircle(xb, yb, wb, hb, xc, yc, rc)
{
    const hw = wb / 2
    const hh = hb / 2
    const distX = Math.abs(xc - (xb + wb / 2))
    const distY = Math.abs(yc - (yb + hb / 2))

    if (distX > hw + rc || distY > hh + rc)
    {
        return false
    }

    if (distX <= hw || distY <= hh)
    {
        return true
    }

    const x = distX - hw
    const y = distY - hh
    return x * x + y * y <= rc * rc
}