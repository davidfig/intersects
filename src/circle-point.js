/**
 * circle-point collision
 * @param {number} x1 center of circle
 * @param {number} y1 center of circle
 * @param {radius} r1 radius of circle
 * @param {number} x2 point
 * @param {number} y2 point
 * @return {boolean}
 */
export function circlePoint(x1, y1, r1, x2, y2)
{
    var x = x2 - x1
    var y = y2 - y1
    return x * x + y * y <= r1 * r1
}

/**
 * point-circle collision
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} x1 point
 * @param {number} y1 point
 * @return {boolean}
 */
export function pointCircle(x1, y1, xc, yc, rc)
{
    return circlePoint(xc, yc, rc, x1, y1)
}
