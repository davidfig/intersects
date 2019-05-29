'use strict'

const lineToPolygon = require('./lineToPolygon')
const polygonPolygon = require('./polygon-polygon')
const linePolygon = require('./line-polygon')
const lineToLine = require('./lineToLine')

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
 * @param {number} [thickness1] of line 1 (the line is centered in its thickness--see demo)
 * @param {number} [thickness2] of line 2 (the line is centered in its thickness--see demo)
 * @return {boolean}
 */
module.exports = function lineLine(x1, y1, x2, y2, x3, y3, x4, y4, thickness1, thickness2)
{
    if (thickness1 || thickness2)
    {
        return lineLineThickness(x1, y1, x2, y2, x3, y3, x4, y4, thickness1, thickness2)
    }
    else
    {
        return lineToLine(x1, y1, x2, y2, x3, y3, x4, y4)
    }
}

function lineLineThickness(x1, y1, x2, y2, x3, y3, x4, y4, thickness1, thickness2)
{
    if (thickness1 && thickness2)
    {
        return polygonPolygon(lineToPolygon(x1, y1, x2, y2, thickness1), lineToPolygon(x3, y3, x4, y4, thickness2))
    }
    else if (thickness1)
    {
        return linePolygon(x3, y3, x4, y4, lineToPolygon(x1, y1, x2, y2, thickness1))
    }
    else if (thickness2)
    {
        return linePolygon(x1, y1, x2, y2, lineToPolygon(x3, y3, x4, y4, thickness1))
    }
}