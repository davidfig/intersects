'use strict'

/**
 * box-circle collision
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {number} rc radius of circle
 */
module.exports = function boxCircle(xb, yb, wb, hb, xc, yc, rc)
{
    var hw = wb / 2
    var hh = hb / 2
    var distX = Math.abs(xc - (xb + wb / 2))
    var distY = Math.abs(yc - (yb + hb / 2))

    if (distX > hw + rc || distY > hh + rc)
    {
        return false
    }

    if (distX <= hw || distY <= hh)
    {
        return true
    }

    var x = distX - hw
    var y = distY - hh
    return x * x + y * y <= rc * rc
}
