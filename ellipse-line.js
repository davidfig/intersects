/**
 * ellipse-line collision
 * adapted from https://social.msdn.microsoft.com/Forums/windowsapps/en-US/b599db66-a987-4dba-b5b9-7babc9badc9c/finding-the-intersection-points-of-a-line-and-an-ellipse?forum=wpdevelop
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rx radius-x of ellipse
 * @param {number} ry radius-y of ellipse
 * @param {number} x1 first point of line
 * @param {number} y1 first point of line
 * @param {number} x2 second point of line
 * @param {number} y2 second point of line
 */
module.exports = function ellipseLine(xe, ye, rx, ry, x1, y1, x2, y2)
{
    // Used for Quadratic equation
    var aa, bb, cc

    // Non Vertical line
    if (x1 !== x2)
    {
        var m = (y2 - y1) / (x2 - x1)
        var c = y1 - m * x1

        aa = ry * ry + rx * rx * m * m
        bb = 2 * rx * rx * c * m - 2 * rx * rx * ye * m - 2 * xe * ry * ry
        cc = ry * ry * xe * xe  + rx * rx * c * c - 2 * rx * rx * ye * c + rx * rx * ye * ye - rx * rx * ry * ry
    }
    else // Vertical Line
    {
        aa = rx * rx
        bb = -2 * ye * rx * rx
        cc = -rx * rx * ry * ry + ry * ry * (x1 - xe) * (x1 - xe)
    }
    return bb * bb - 4 * aa * cc > 0
}