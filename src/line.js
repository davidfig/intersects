/**
 * line-line collision
 * from http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
 * @param {number} x1 first point in line 1
 * @param {number} y1 first point in line 1
 * @param {number} x2 second point in line 1
 * @param {number} y2 second point in line 1
 * @param {number} x3 first point in line 2
 * @param {number} y3 first point in line 2
 * @param {number} x4 second point in line 2
 * @param {number} y4 second point in line 2
 * @return {boolean}
 */
function lineLine(x1, y1, x2, y2, x3, y3, x4, y4)
{
    const s1_x = x2 - x1
    const s1_y = y2 - y1
    const s2_x = x4 - x3
    const s2_y = y4 - y3
    const s = (-s1_y * (x1 - x3) + s1_x * (y1 - y3)) / (-s2_x * s1_y + s1_x * s2_y)
    const t = (s2_x * (y1 - y3) - s2_y * (x1 - x3)) / (-s2_x * s1_y + s1_x * s2_y)
    return s >= 0 && s <= 1 && t >= 0 && t <= 1
}

/**
 * line-box collision
 number @param {number} x1 point 1 of line
 number @param {number} y1 point 1 of line
 number @param {number} x2 point 2 of line
 number @param {number} y2 point 2 of line
 number @param {number} xb top-left of box
 number @param {number} yb top-left of box
 number @param {number} wb width of box
 number @param {number} hb height of box
 */
function lineBox(x1, y1, x2, y2, xb, yb, wb, hb)
{
    function boxPoint(x1, y1, w1, h1, x2, y2)
    {
        return x2 >= x1 && x2 <= x1 + w1 && y2 >= y1 && y2 <= y1 + h1
    }

    if (boxPoint(xb, yb, wb, hb, x1, y1) || boxPoint(xb, yb, wb, hb, x2, y2))
    {
        return true
    }
    return lineLine(x1, y1, x2, y2, xb, yb, xb + wb, yb) ||
        lineLine(x1, y1, x2, y2, xb + wb, yb, xb + wb, yb + hb) ||
        lineLine(x1, y1, x2, y2, xb, yb + hb, xb + wb, yb + hb) ||
        lineLine(x1, y1, x2, y2, xb, yb, xb, yb + hb)
}

/**
 * line-circle collision
 number @param {number} x1 point 1 of line
 number @param {number} y1 point 1 of line
 number @param {number} x2 point 2 of line
 number @param {number} y2 point 2 of line
 number @param {number} xc center of circle
 number @param {number} yc center of circle
 number @param {number} rc radius of circle
 */
function lineCircle(x1, y1, x2, y2, xc, yc, rc)
{
    function dot(v1, v2)
    {
        return (v1[0] * v2[0]) + (v1[1] * v2[1])
    }

    const ac = [xc - x1, yc - y1]
    const ab = [x2 - x1, y2 - y1]
    const ab2 = dot(ab, ab)
    const acab = dot(ac, ab)
    let t = acab / ab2
    t = (t < 0) ? 0 : t
    t = (t > 1) ? 1 : t
    let h = [(ab[0] * t + x1) - xc, (ab[1] * t + y1) - yc]
    const h2 = dot(h, h)
    return h2 <= rc * rc
}

/**
 * line-polygon collision
 number @param {number} x1 point 1 of line
 number @param {number} y1 point 1 of line
 number @param {number} x2 point 2 of line
 number @param {number} y2 point 2 of line
 number @param {number[]} points of polygon
 */
function linePolygon(x1, y1, x2, y2, points)
{
    const length = points.length

    // check if first point is inside the shape (this covers if the line is completely enclosed by the shape)
    if (polygonPoint(points, x1, y1))
    {
        return true
    }

    // check for intersections for all of the sides
    for (let i = 0; i < length; i += 2)
    {
        const j = (i + 2) % length
        if (Line.lineLine(x1, y1, x2, y2, points[i], points[i + 1], points[j], points[j + 1]))
        {
            return true
        }
    }
    return false
}

module.exports = {
    lineLine,
    lineBox,
    linePolygon,
    lineCircle
}