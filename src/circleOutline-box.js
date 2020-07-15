var circlePoint = require('./circle-point')
var boxCircle = require('./box-circle')

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
module.exports = function circleOutlineBox(xc, yc, rc, x, y, width, height, thickness)
{
    thickness = thickness || 1
    var count = 0
    count += circlePoint(xc, yc, rc, x, y) ? 1 : 0
    count += circlePoint(xc, yc, rc, x + width, y) ? 1 : 0
    count += circlePoint(xc, yc, rc, x, y + height) ? 1 : 0
    count += circlePoint(xc, yc, rc, x + width, y + height) ? 1 : 0

    // if no corners are inside the circle, then intersects only if box encloses circle-outline
    if (count === 0)
    {
        return boxCircle(x, y, width, height, xc, yc, rc)
    }

    // if one corner is inside and one corner is outside then box intersects circle-outline
    if (count >= 1 && count <= 3)
    {
        return true
    }

    // last check is if box is inside circle, need to check that a corner is not inside the inner circle
    if (count === 4)
    {
        return !circlePoint(xc, yc, rc - thickness, x, y) ||
            !circlePoint(xc, yc, rc - thickness, x + width, y) ||
            !circlePoint(xc, yc, rc - thickness, x, y + height) ||
            !circlePoint(xc, yc, rc - thickness, x + width, y + height)
    }
}