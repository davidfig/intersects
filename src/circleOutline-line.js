import {lineCircle} from './circle-line';
import {circlePoint} from './circle-point';

/**
 * circleOutline-line collision
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} x1 of point 1 of line
 * @param {number} y1 of point 1 of line
 * @param {number} x2 of point 2 of line
 * @param {number} y2 of point 2 of line
 * @param {number} thickness of circle outline
 */
export function circleOutlineLine(xc, yc, rc, x1, y1, x2, y2, thickness)
{
    thickness = thickness || 1
    return lineCircle(x1, y1, x2, y2, xc, yc, rc) && !(circlePoint(xc, yc, rc - thickness, x1, y1) && circlePoint(xc, yc, rc - thickness, x2, y2))
}

/**
 * line-circleOutline collision
 * @param {number} x1 of point 1 of line
 * @param {number} y1 of point 1 of line
 * @param {number} x2 of point 2 of line
 * @param {number} y2 of point 2 of line
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} thickness of circle outline
 */
export function lineCircleOutline(x1, y1, x2, y2, xc, yc, rc, thickness)
{
    return circleOutlineLine(xc, yc, rc, x1, y1, x2, y2, thickness)
}