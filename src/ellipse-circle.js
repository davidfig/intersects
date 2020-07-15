var ellipseHelper = require('./ellipse-helper')

/**
 * ellipse-circle collision
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rex radius-x of ellipse
 * @param {number} rey radius-y of ellipse
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {number} rc radius of circle
 * @return {boolean}
 */
module.exports = function ellipseCircle(xe, ye, rex, rey, xc, yc, rc)
{
    return ellipseHelper.ellipseCircle(xe, ye, rex, rey, xc, yc, rc)
}
