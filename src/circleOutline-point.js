import {circlePoint} from './circle-point';

/**
 * circleOutline-point collision
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} x of point
 * @param {number} y of point
 * @param {number} thickness of circle outline
 */
export function circleOutlinePoint(xc, yc, rc, x, y, thickness)
{
    thickness = thickness || 1
    return circlePoint(xc, yc, rc, x, y) && !circlePoint(xc, yc, rc - thickness, x, y)
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