'use strict'

/**
 * line-line collision
 * from http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
 * @param {number} x1 first point in line 1
 * @param {number} y1 first point in line 1
 * @param {number} x2 second point in line 1
 * @param {number} y2 second point in line 1
 * @param {number} x3 first point in line 2
 * @param {number} y3 first point in line 2
 * @param {number} x4 second point in line 2
 * @param {number} y4 second point in line 2
 * @return {boolean}
 */
module.exports = function lineLine(x1, y1, x2, y2, x3, y3, x4, y4)
{
    var s1_x = x2 - x1
    var s1_y = y2 - y1
    var s2_x = x4 - x3
    var s2_y = y4 - y3
    var s = (-s1_y * (x1 - x3) + s1_x * (y1 - y3)) / (-s2_x * s1_y + s1_x * s2_y)
    var t = (s2_x * (y1 - y3) - s2_y * (x1 - x3)) / (-s2_x * s1_y + s1_x * s2_y)
    return s >= 0 && s <= 1 && t >= 0 && t <= 1
}
