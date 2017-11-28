const Polygon = require ('./polygon')

/**
 * circle-point collision
 * @param {number} x1 center of circle
 * @param {number} y1 center of circle
 * @param {radius} r1 radius of circle
 * @param {number} x2 point
 * @param {number} y2 point
 * @return {boolean}
 */
function circlePoint(x1, y1, r1, x2, y2)
{
    const x = x2 - x1
    const y = y2 - y1
    return x * x + y * y <= r1 * r1
}

/**
 * circle-circle collision
 * @param {number} x1 center of circle 1
 * @param {number} y1 center of circle 1
 * @param {number} r1 radius of circle 1
 * @param {number} x2 center of circle 2
 * @param {number} y2 center of circle 2
 * @param {number} r2 radius of circle 2
 * @return {boolean}
 */
function circleCircle(x1, y1, r1, x2, y2, r2)
{
    const x = x1 - x2
    const y = y2 - y1
    const radii = r1 + r2
    return x * x + y * y <= radii * radii
}

/**
 * circle-line collision
 * from http://stackoverflow.com/a/10392860/1955997
 * @param {number} x1 center of circle
 * @param {number} y1 center of circle
 * @param {radius} r1 radius of circle
 * @param {number} x2 first point of line
 * @param {number} y2 first point of line
 * @param {number} x3 second point of line
 * @param {number} y3 second point of line
 * @return {boolean}
 */
function circleLine(x1, y1, r1, x2, y2, x3, y3)
{
    function dot(v1, v2)
    {
        return (v1[0] * v2[0]) + (v1[1] * v2[1])
    }

    const ac = [x1 - x2, y1 - y2]
    const ab = [x3 - x2, y3 - y2]
    const ab2 = dot(ab, ab)
    const acab = dot(ac, ab)
    let t = acab / ab2
    t = (t < 0) ? 0 : t
    t = (t > 1) ? 1 : t
    let h = [(ab[0] * t + x2) - x1, (ab[1] * t + y2) - y1]
    const h2 = dot(h, h)
    return h2 <= r1 * r1
}

/**
 * circle-box (axis-oriented rectangle) collision
 * from http://stackoverflow.com/a/402010/1955997
 * @param {number} x1 center of circle
 * @param {number} y1 center of circle
 * @param {radius} r1 radius of circle
 * @param {number} x2 top-left corner of rectangle
 * @param {number} y2 top-left corner of rectangle
 * @param {number} w2 width of rectangle
 * @param {number} h2 height of rectangle
 */
function circleBox(x1, y1, r1, x2, y2, w2, h2)
{
    const hw = w2 / 2
    const hh = h2 / 2
    const distX = Math.abs(x1 - (x2 + w2 / 2))
    const distY = Math.abs(y1 - (y2 + h2 / 2))

    if (distX > hw + r1 || distY > hh + r1)
    {
        return false
    }

    if (distX <= hw || distY <= hh)
    {
        return true
    }

    const x = distX - hw
    const y = distY - hh
    return x * x + y * y <= r1 * r1
}

/**
 * circle-polygon collision
 * from http://stackoverflow.com/a/402019/1955997
 * @param {number} x1 center of circle
 * @param {number} y1 center of circle
 * @param {radius} r1 radius of circle
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 */
function circlePolygon(x1, y1, r1, points)
{
    if (Polygon.polygonPoint(points, x1, y1))
    {
        return true
    }
    const count = points.length
    for (let i = 0; i < count - 2; i += 2)
    {
        if (circleLine(x1, y1, r1, points[i], points[i + 1], points[i + 2], points[i + 3]))
        {
            return true
        }
    }
    return circleLine(x1, y1, r1, points[0], points[1], points[count - 2], points[count - 1])
}

module.exports = {
    circlePoint,
    circleCircle,
    circleLine,
    circleBox,
    circlePolygon
}