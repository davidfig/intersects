/**
 * ellipse-line collision
 * adapted from http://csharphelper.com/blog/2017/08/calculate-where-a-line-segment-and-an-ellipse-intersect-in-c/
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rex radius-x of ellipse
 * @param {number} rey radius-y of ellipse
 * @param {number} x1 first point of line
 * @param {number} y1 first point of line
 * @param {number} x2 second point of line
 * @param {number} y2 second point of line
 */
module.exports = function ellipseLine(xe, ye, rex, rey, x1, y1, x2, y2)
{
    x1 -= xe
    x2 -= xe
    y1 -= ye
    y2 -= ye

    var A = Math.pow(x2 - x1, 2) / rex / rex + Math.pow(y2 - y1, 2) / rey / rey
    var B = 2 * x1 * (x2 - x1) / rex / rex + 2 * y1 * (y2 - y1) / rey / rey
    var C = x1 * x1 / rex / rex + y1 * y1 / rey / rey - 1
    var D = B * B - 4 * A * C
    if (D === 0)
    {
        var t = -B / 2 / A
        return t >= 0 && t <= 1
    }
    else if (D > 0)
    {
        var sqrt = Math.sqrt(D)
        var t1 = (-B + sqrt) / 2 / A
        var t2 = (-B - sqrt) / 2 / A
        return (t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1)
    }
    else
    {
        return false
    }
}