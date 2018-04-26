'use strict'

/**
 * line-circle collision
 number @param {number} x1 point 1 of line
 number @param {number} y1 point 1 of line
 number @param {number} x2 point 2 of line
 number @param {number} y2 point 2 of line
 number @param {number} xc center of circle
 number @param {number} yc center of circle
 number @param {number} rc radius of circle
 */
module.exports = function lineCircle(x1, y1, x2, y2, xc, yc, rc)
{
    var ac = [xc - x1, yc - y1]
    var ab = [x2 - x1, y2 - y1]
    var ab2 = dot(ab, ab)
    var acab = dot(ac, ab)
    var t = acab / ab2
    t = (t < 0) ? 0 : t
    t = (t > 1) ? 1 : t
    var h = [(ab[0] * t + x1) - xc, (ab[1] * t + y1) - yc]
    var h2 = dot(h, h)
    return h2 <= rc * rc
}

function dot(v1, v2)
{
    return (v1[0] * v2[0]) + (v1[1] * v2[1])
}
