var circleOutlineBox = require('./circleOutline-box')

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