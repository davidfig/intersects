var ellipseCircle = require('./ellipse-circle')

/**
 * circle-ellipse collision
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {number} rc radius of circle
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rex radius-x of ellipse
 * @param {number} rey radius-y of ellipse
 * @return {boolean}
 */
module.exports = function circleEllipse(xc, yc, rc, xe, ye, rex, rey)
{
    return ellipseCircle(xe, ye, rex, rey, xc, yc, rc)
}
