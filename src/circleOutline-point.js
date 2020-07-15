var circlePoint = require('./circle-point')

/**
 * circleOutline-point collision
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} x of point
 * @param {number} y of point
 * @param {number} thickness of circle outline
 */
module.exports = function circleOutlinePoint(xc, yc, rc, x, y, thickness)
{
    thickness = thickness || 1
    return circlePoint(xc, yc, rc, x, y) && !circlePoint(xc, yc, rc - thickness, x, y)
}