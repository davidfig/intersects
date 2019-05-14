var circleOutlinePoint = require('./circleOutline-point')

/**
 * point-circleOutline collision
 * @param {number} x of point
 * @param {number} y of point
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} thickness of circle outline
 */
module.exports = function pointCircleOutline(x, y, xc, yc, rc, thickness)
{
    return circleOutlinePoint(x, y, xc, yc, rc, thickness)
}