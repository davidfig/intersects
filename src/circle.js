import { lineCircle, polygonCircle, boxCircle, ellipseCircle } from './import'

/**
 * circle-point collision
 * @param {number} x1 center of circle
 * @param {number} y1 center of circle
 * @param {radius} r1 radius of circle
 * @param {number} x2 point
 * @param {number} y2 point
 * @return {boolean}
 */
export function circlePoint(x1, y1, r1, x2, y2)
{
    let x = x2 - x1
    let y = y2 - y1
    return x * x + y * y <= r1 * r1
}

/**
 * circle-line collision
 * from http://stackoverflow.com/a/10392860/1955997
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} x1 first point of line
 * @param {number} y1 first point of line
 * @param {number} x2 second point of line
 * @param {number} y2 second point of line
 * @return {boolean}
 */
export function circleLine(xc, yc, rc, x1, y1, x2, y2)
{
    return lineCircle(x1, y1, x2, y2, xc, yc, rc)
}

/**
 * circle-polygon collision
 * from http://stackoverflow.com/a/402019/1955997
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 */
export function circlePolygon(xc, yc, rc, points)
{
    return polygonCircle(points, xc, yc, rc)
}

/**
 * circle-box (axis-oriented rectangle) collision
 * from http://stackoverflow.com/a/402010/1955997
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} xb top-left corner of rectangle
 * @param {number} yb top-left corner of rectangle
 * @param {number} wb width of rectangle
 * @param {number} hb height of rectangle
 */
export function circleBox(xc, yc, rc, xb, yb, wb, hb)
{
    return boxCircle(xb, yb, wb, hb, xc, yc, rc)
}

/**
 * circle-ellipse collision
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {number} rc radius of circle
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rex radius-x of ellipse
 * @param {number} rey radius-y of ellipse
 * @return {boolean}
 */
export function circleEllipse(xc, yc, rc, xe, ye, rex, rey)
{
    return ellipseCircle(xe, ye, rex, rey, xc, yc, rc)
}