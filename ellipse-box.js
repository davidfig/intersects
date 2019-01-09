var ellipseLine = require('./ellipse-line')
var boxPoint = require('./box-point')

/**
 * ellipse-box (axis-oriented rectangle) collision
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {radius} rex radius-x of ellipse
 * @param {radius} rey radius-y of ellipse
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 */
module.exports = function ellipseBox(xe, ye, rex, rey, xb, yb, wb, hb)
{
    return boxPoint(xb, yb, wb, hb, xe, ye) ||
        ellipseLine(xe, ye, rex, rey, xb, yb, xb + wb, yb) ||
        ellipseLine(xe, ye, rex, rey, xb, yb + hb, xb + wb, yb + hb) ||
        ellipseLine(xe, ye, rex, rey, xb, yb, xb, yb + hb) ||
        ellipseLine(xe, ye, rex, rey, xb + wb, yb, xb + wb, yb + hb)
}