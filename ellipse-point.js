/**
 * ellipse-point collision
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {radius} rex radius-x of ellipse
 * @param {radius} rey radius-y of ellipse
 * @param {number} x1 point
 * @param {number} y1 point
 * @return {boolean}
 */
module.exports = function ellipsePoint(xe, ye, rex, rey, x1, y1)
{
    var x = Math.pow(x1 - xe, 2) / (rex * rex)
    var y = Math.pow(y1 - ye, 2) / (rey * rey)
    return x + y <= 1
}
