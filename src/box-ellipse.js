var ellipseBox = require('./ellipse-box')

/**
 * box-ellipse (axis-oriented rectangle) collision
 * @param {number} xb top-left corner of rectangle
 * @param {number} yb top-left corner of rectangle
 * @param {number} wb width of rectangle
 * @param {number} hb height of rectangle
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {radius} rex radius-x of ellipse
 * @param {radius} rey radius-y of ellipse
 */
module.exports = function boxEllipse(xb, yb, wb, hb, xe, ye, rex, rey)
{
    return ellipseBox(xe, ye, rex, rey, xb, yb, wb, hb)
}