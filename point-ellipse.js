var ellipsePoint = require('./ellipse-point')

/**
 * point-ellipse collision
 * @param {number} x1 point
 * @param {number} y1 point
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {radius} rex radius-x of ellipse
 * @param {radius} rey radius-y of ellipse
 * @return {boolean}
 */
module.exports = function pointEllipse(x1, y1, xe, ye, rex, rey)
{
    return ellipsePoint(xe, ye, rex, rey, x1, y1)
}