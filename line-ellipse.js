var ellipseLine = require('./ellipse-line')

/**
 * line-ellipse collision
 * @param {number} x1 first point of line
 * @param {number} y1 first point of line
 * @param {number} x2 second point of line
 * @param {number} y2 second point of line
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rx radius-x of ellipse
 * @param {number} ry radius-y of ellipse
 */
module.exports = function lineEllipse(x1, y1, x2, y2, xe, ye, rex, rey)
{
    return ellipseLine(xe, ye, rex, rey, x1, y1, x2, y2)
}