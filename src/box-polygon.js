import {polygonPolygon} from './polygon-polygon';

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
