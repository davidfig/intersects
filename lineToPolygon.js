'use strict'

/**
 * turns a line into a polygon using thickness
 * @param {number} x1 first point of line
 * @param {number} y1 first point of line
 * @param {number} x2 second point of line
 * @param {number} y2 second point of line
 * @param {number} thickness of line
 */
module.exports = function lineToPolygon(x1, y1, x2, y2, thickness)
{
    const angle = Math.atan2(y2 - y1, x2 - x1) - Math.PI / 2
    const half = thickness / 2
    const cos = Math.cos(angle) * half
    const sin = Math.sin(angle) * half
    return [
        x1 - cos, y1 - sin,
        x2 - cos, y2 - sin,
        x2 + cos, y2 + sin,
        x1 + cos, y1 + sin
    ]
}