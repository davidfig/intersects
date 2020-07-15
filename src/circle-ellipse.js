import * as ellipseHelper from './ellipse-helper';

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
    return ellipseHelper.ellipseCircle(xe, ye, rex, rey, xc, yc, rc)
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
