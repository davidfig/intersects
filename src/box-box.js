'use strict'

/**
 * box-box collision
 * @param {number} x1 top-left corner of first box
 * @param {number} y1 top-left corner of first box
 * @param {number} w1 width of first box
 * @param {number} h1 height of first box
 * @param {number} x2 top-left corner of second box
 * @param {number} y2 top-left corner of second box
 * @param {number} w2 width of second box
 * @param {number} h2 height of second box
 */
module.exports = function boxBox(x1, y1, w1, h1, x2, y2, w2, h2)
{
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2
}
