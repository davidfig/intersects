var ellipseHelper = require('./ellipse-helper')

/**
 * ellipse-ellipse collision
 * @param {number} x1 center of ellipse 1
 * @param {number} y1 center of ellipse 1
 * @param {number} r1x radius-x of ellipse 1
 * @param {number} r1y radius-y of ellipse 1
 * @param {number} x2 center of ellipse 2
 * @param {number} y2 center of ellipse 2
 * @param {number} r2x radius of ellipse 2
 * @param {number} r2y radius of ellipse 2
 * @return {boolean}
 */
module.exports = function ellipseEllipse(x1, y1, r1x, r1y, x2, y2, r2x, r2y)
{
    return ellipseHelper.ellipseEllipse(x1, y1, r1x, r1y, x2, y2, r2x, r2y)
}
