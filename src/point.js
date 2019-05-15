import { boxPoint } from './box'
import { polygonPoint } from './polygon'
import { linePoint } from './line'
import { ellipsePoint } from './ellipse'
import { circleOutlinePoint } from './circleOutline'
import { circlePoint } from './circle'

/**
 * point-box collision
 * @param {number} x1 point
 * @param {number} y1 point
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 * @return {boolean}
 */
export function pointBox(x1, y1, xb, yb, wb, hb)
{
    return boxPoint(xb, yb, wb, hb, x1, y1)
}

/**
 * polygon-point collision
 * based on https://stackoverflow.com/a/17490923/1955997
 * @param {number} x1
 * @param {number} y1
 * @param {number[]} points
 * @param {number} [tolerance=1] maximum distance of point to polygon's edges that triggers collision (see pointLine)
 * @return {boolean}
 */
export function pointPolygon(x1, y1, points, tolerance)
{
    return polygonPoint(points, x1, y1, tolerance)
}

/**
 * point-line collision
 * @param {number} xp point
 * @param {number} yp point
 * @param {number} x1 first point in line
 * @param {number} y1 first point in line
 * @param {number} x2 second point in line
 * @param {number} y2 second point in line
 * @return {boolean}
 */
export function pointLine(xp, yp, x1, y1, x2, y2)
{
    return linePoint(x1, y1, x2, y2, xp, yp)
}

/**
 * point-ellipse collision
 * @param {number} x1 point
 * @param {number} y1 point
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {radius} rex radius-x of ellipse
 * @param {radius} rey radius-y of ellipse
 * @return {boolean}
 */
export function pointEllipse(x1, y1, xe, ye, rex, rey)
{
    return ellipsePoint(xe, ye, rex, rey, x1, y1)
}

/**
 * point-circleOutline collision
 * @param {number} x of point
 * @param {number} y of point
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} thickness of circle outline
 */
export function pointCircleOutline(x, y, xc, yc, rc, thickness)
{
    return circleOutlinePoint(x, y, xc, yc, rc, thickness)
}

export function pointCircle(x1, y1, xc, yc, rc)
{
    return circlePoint(xc, yc, rc, x1, y1)
}
