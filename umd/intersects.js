(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.intersects = {}));
}(this, function (exports) { 'use strict';

    /**
     * box-box collision
     * @param {number} x1 top-left corner of first box
     * @param {number} y1 top-left corner of first box
     * @param {number} w1 width of first box
     * @param {number} h1 height of first box
     * @param {number} x2 top-left corner of second box
     * @param {number} y2 top-left corner of second box
     * @param {number} w2 width of second box
     * @param {number} h2 height of second box
     */
    function boxBox(x1, y1, w1, h1, x2, y2, w2, h2)
    {
        return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2
    }

    /**
     * box-polygon collision
     * @param {number} xb top-left corner of box
     * @param {number} yb top-left corner of box
     * @param {number} wb width of box
     * @param {number} hb height of box
     * @param {number[]} points of polygon
     */
    function boxPolygon(xb, yb, wb, hb, points)
    {
        return polygonBox(points, xb, yb, wb, hb)
    }

    /**
     * box-point collision
     * @param {number} x1 top-left corner of box
     * @param {number} y1 top-left corner of box
     * @param {number} w1 width of box
     * @param {number} h1 height of box
     * @param {number} x2 of point
     * @param {number} y2 of point
     * @return {boolean}
     */
    function boxPoint(x1, y1, w1, h1, x2, y2)
    {
        return x2 >= x1 && x2 <= x1 + w1 && y2 >= y1 && y2 <= y1 + h1
    }

    /**
     * box-line collision
     * @param {number} xb top-left corner of box
     * @param {number} yb top-left corner of box
     * @param {number} wb width of box
     * @param {number} hb height of box
     * @param {number} x1 first point of line
     * @param {number} y1 first point of line
     * @param {number} x2 second point of line
     * @param {number} y2 second point of line
     */
    function boxLine(xb, yb, wb, hb, x1, y1, x2, y2)
    {
        return lineBox(x1, y1, x2, y2, xb, yb, wb, hb)
    }

    /**
     * box-ellipse (axis-oriented rectangle) collision
     * @param {number} xb top-left corner of rectangle
     * @param {number} yb top-left corner of rectangle
     * @param {number} wb width of rectangle
     * @param {number} hb height of rectangle
     * @param {number} xe center of ellipse
     * @param {number} ye center of ellipse
     * @param {radius} rex radius-x of ellipse
     * @param {radius} rey radius-y of ellipse
     */
    function boxEllipse(xb, yb, wb, hb, xe, ye, rex, rey)
    {
        return ellipseBox(xe, ye, rex, rey, xb, yb, wb, hb)
    }

    /**
     * circleOutline-box (axis-aligned) collision
     * @param {number} xc center of circle
     * @param {number} yc center of circle
     * @param {radius} rc radius of circle
     * @param {number} x top-left corner of box
     * @param {number} y top-left corner of box
     * @param {number} width of box
     * @param {number} height of box
     * @param {number} thickness of circle outline
     */
    module.exports = function boxCircleOutline(x, y, width, height, xc, yc, rc, thickness)
    {
        return circleOutlineBox(xc, yc, rc, x, y, width, height, thickness)
    };

    /**
     * box-circle collision
     * @param {number} xb top-left corner of box
     * @param {number} yb top-left corner of box
     * @param {number} wb width of box
     * @param {number} hb height of box
     * @param {number} xc center of circle
     * @param {number} yc center of circle
     * @param {number} rc radius of circle
     */
    function boxCircle(xb, yb, wb, hb, xc, yc, rc)
    {
        const hw = wb / 2;
        const hh = hb / 2;
        const distX = Math.abs(xc - (xb + wb / 2));
        const distY = Math.abs(yc - (yb + hb / 2));

        if (distX > hw + rc || distY > hh + rc)
        {
            return false
        }

        if (distX <= hw || distY <= hh)
        {
            return true
        }

        const x = distX - hw;
        const y = distY - hh;
        return x * x + y * y <= rc * rc
    }

    /**
     * polygon-box collision
     * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
     * @param {number} x of box
     * @param {number} y of box
     * @param {number} w of box
     * @param {number} h of box
     */
    function polygonBox(points, x, y, w, h)
    {
        var points2 = [x, y, x + w, y, x + w, y + h, x, y + h];
        return polygonPolygon(points, points2)
    }

    /**
     * polygon-polygon collision
     * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
     * @param {number[]} points1 [x1, y1, x2, y2, ... xn, yn] of first polygon
     * @param {number[]} points2 [x1, y1, x2, y2, ... xn, yn] of second polygon
     * @return {boolean}
     */
    function polygonPolygon(points1, points2)
    {
        const a = points1;
        const b = points2;
        const polygons = [a, b];
        let minA, maxA, projected, minB, maxB, j;
        for (let i = 0; i < polygons.length; i++)
        {
            const polygon = polygons[i];
            for (let i1 = 0; i1 < polygon.length; i1 += 2)
            {
                const i2 = (i1 + 2) % polygon.length;
                const normal = { x: polygon[i2 + 1] - polygon[i1 + 1], y: polygon[i1] - polygon[i2] };
                minA = maxA = null;
                for (j = 0; j < a.length; j += 2)
                {
                    projected = normal.x * a[j] + normal.y * a[j + 1];
                    if (minA === null || projected < minA)
                    {
                        minA = projected;
                    }
                    if (maxA === null || projected > maxA)
                    {
                        maxA = projected;
                    }
                }
                minB = maxB = null;
                for (j = 0; j < b.length; j += 2)
                {
                    projected = normal.x * b[j] + normal.y * b[j + 1];
                    if (minB === null || projected < minB)
                    {
                        minB = projected;
                    }
                    if (maxB === null || projected > maxB)
                    {
                        maxB = projected;
                    }
                }
                if (maxA < minB || maxB < minA)
                {
                    return false
                }
            }
        }
        return true
    }

    /**
     * polygon-point collision
     * based on https://stackoverflow.com/a/17490923/1955997
     * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
     * @param {number} x of point
     * @param {number} y of point
     * @param {number} [tolerance=1] maximum distance of point to polygon's edges that triggers collision (see pointLine)
     */
    function polygonPoint(points, x, y, tolerance)
    {
        const length = points.length;
        let c = false;
        let i, j;
        for (i = 0, j = length - 2; i < length; i += 2)
        {
            if (((points[i + 1] > y) !== (points[j + 1] > y)) && (x < (points[j] - points[i]) * (y - points[i + 1]) / (points[j + 1] - points[i + 1]) + points[i]))
            {
                c = !c;
            }
            j = i;
        }
        if (c)
        {
            return true
        }
        for (i = 0; i < length; i += 2)
        {
            var p1x = points[i];
            var p1y = points[i + 1];
            var p2x, p2y;
            if (i === length - 2)
            {
                p2x = points[0];
                p2y = points[1];
            }
            else
            {
                p2x = points[i + 2];
                p2y = points[i + 3];
            }
            if (linePoint(p1x, p1y, p2x, p2y, x, y, tolerance))
            {
                return true
            }
        }
        return false
    }

    /**
     * polygon-line collisions
     * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
     * @param {number} x1 first point in line
     * @param {number} y1 first point in line
     * @param {number} x2 second point in line
     * @param {number} y2 second point in line
     * @param {tolerance=1} maximum distance of point to polygon's edges that triggers collision (see pointLine)
     * @return {boolean}
     */
    function polygonLine(points, x1, y1, x2, y2, tolerance)
    {
        return linePolygon(x1, y1, x2, y2, points, tolerance)
    }

    /**
     * polygon-ellipse collision
     * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
     * @param {number} xe center of ellipse
     * @param {number} ye center of ellipse
     * @param {number} rex radius-x of ellipse
     * @param {number} rey radius-y of ellipse
     */
    function polygonEllipse(points, xe, ye, rex, rey)
    {
        if (polygonPoint(points, xe, ye))
        {
            return true
        }
        const count = points.length;
        for (let i = 0; i < count - 2; i += 2)
        {
            if (lineEllipse(points[i], points[i + 1], points[i + 2], points[i + 3], xe, ye, rex, rey))
            {
                return true
            }
        }
        return lineEllipse(points[0], points[1], points[count - 2], points[count - 1], xe, ye, rex, rey)
    }

    /**
     * polygon-circle collision
     * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
     * @param {number} xc center of circle
     * @param {number} yc center of circle
     * @param {number} rc radius of circle
     */
    function polygonCircle(points, xc, yc, rc)
    {
        if (polygonPoint(points, xc, yc))
        {
            return true
        }
        const count = points.length;
        for (let i = 0; i < count - 2; i += 2)
        {
            if (lineCircle(points[i], points[i + 1], points[i + 2], points[i + 3], xc, yc, rc))
            {
                return true
            }
        }
        return lineCircle(points[0], points[1], points[count - 2], points[count - 1], xc, yc, rc)
    }

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
    function lineEllipse(x1, y1, x2, y2, xe, ye, rex, rey)
    {
        x1 -= xe;
        x2 -= xe;
        y1 -= ye;
        y2 -= ye;

        const A = Math.pow(x2 - x1, 2) / rex / rex + Math.pow(y2 - y1, 2) / rey / rey;
        const B = 2 * x1 * (x2 - x1) / rex / rex + 2 * y1 * (y2 - y1) / rey / rey;
        const C = x1 * x1 / rex / rex + y1 * y1 / rey / rey - 1;
        const D = B * B - 4 * A * C;
        if (D === 0)
        {
            const t = -B / 2 / A;
            return t >= 0 && t <= 1
        }
        else if (D > 0)
        {
            const sqrt = Math.sqrt(D);
            const t1 = (-B + sqrt) / 2 / A;
            const t2 = (-B - sqrt) / 2 / A;
            return (t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1)
        }
        else
        {
            return false
        }
    }

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
     * @param {number} [thickness1] of line 1 (the line is centered in its thickness--see demo)
     * @param {number} [thickness2] of line 2 (the line is centered in its thickness--see demo)
     * @return {boolean}
     */
    function lineLine(x1, y1, x2, y2, x3, y3, x4, y4, thickness1, thickness2)
    {
        if (thickness1 || thickness2)
        {
            return lineLineThickness(x1, y1, x2, y2, x3, y3, x4, y4, thickness1, thickness2)
        }
        var s1_x = x2 - x1;
        var s1_y = y2 - y1;
        var s2_x = x4 - x3;
        var s2_y = y4 - y3;
        var s = (-s1_y * (x1 - x3) + s1_x * (y1 - y3)) / (-s2_x * s1_y + s1_x * s2_y);
        var t = (s2_x * (y1 - y3) - s2_y * (x1 - x3)) / (-s2_x * s1_y + s1_x * s2_y);
        return s >= 0 && s <= 1 && t >= 0 && t <= 1
    }

    /**
     * line-point collision
     * from https://stackoverflow.com/a/17693146/1955997
     * @param {number} x1 first point in line
     * @param {number} y1 first point in line
     * @param {number} x2 second point in line
     * @param {number} y2 second point in line
     * @param {number} xp point
     * @param {number} yp point
     * @param {number} [tolerance=1]
     * @return {boolean}
     */
    function linePoint(x1, y1, x2, y2, xp, yp, tolerance)
    {
        tolerance = tolerance || 1;
        return Math.abs(distanceSquared(x1, y1, x2, y2) - (distanceSquared(x1, y1, xp, yp) + distanceSquared(x2, y2, xp, yp))) <= tolerance
    }

    /**
     * line-polygon collision
     @param {number} x1 point 1 of line
     @param {number} y1 point 1 of line
     @param {number} x2 point 2 of line
     @param {number} y2 point 2 of line
     @param {number[]} points of polygon
     @param {tolerance=1} maximum distance of point to polygon's edges that triggers collision (see pointLine)
     */
    function linePolygon(x1, y1, x2, y2, points, tolerance)
    {
        const length = points.length;

        // check if first point is inside the shape (this covers if the line is completely enclosed by the shape)
        if (polygonPoint(points, x1, y1, tolerance))
        {
            return true
        }

        // check for intersections for all of the sides
        for (let i = 0; i < length; i += 2)
        {
            const j = (i + 2) % length;
            if (lineLine(x1, y1, x2, y2, points[i], points[i + 1], points[j], points[j + 1]))
            {
                return true
            }
        }
        return false
    }

    /**
     * turns a line into a polygon using thickness
     * @param {number} x1 first point of line
     * @param {number} y1 first point of line
     * @param {number} x2 second point of line
     * @param {number} y2 second point of line
     * @param {number} thickness of line
     */
    function lineToPolygon(x1, y1, x2, y2, thickness)
    {
        const angle = Math.atan2(y2 - y1, x2 - x1) - Math.PI / 2;
        const half = thickness / 2;
        const cos = Math.cos(angle) * half;
        const sin = Math.sin(angle) * half;
        return [
            x1 - cos, y1 - sin,
            x2 - cos, y2 - sin,
            x2 + cos, y2 + sin,
            x1 + cos, y1 + sin
        ]
    }

    /**
     * line-circle collision
     * @param {number} x1 point 1 of line
     * @param {number} y1 point 1 of line
     * @param {number} x2 point 2 of line
     * @param {number} y2 point 2 of line
     * @param {number} xc center of circle
     * @param {number} yc center of circle
     * @param {number} rc radius of circle
     */
    function lineCircle(x1, y1, x2, y2, xc, yc, rc)
    {
        var ac = [xc - x1, yc - y1];
        var ab = [x2 - x1, y2 - y1];
        var ab2 = dot(ab, ab);
        var acab = dot(ac, ab);
        var t = acab / ab2;
        t = (t < 0) ? 0 : t;
        t = (t > 1) ? 1 : t;
        var h = [(ab[0] * t + x1) - xc, (ab[1] * t + y1) - yc];
        var h2 = dot(h, h);
        return h2 <= rc * rc
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
        if (boxPoint(xb, yb, wb, hb, x1, y1) || boxPoint(xb, yb, wb, hb, x2, y2))
        {
            return true
        }
        return lineLine(x1, y1, x2, y2, xb, yb, xb + wb, yb) ||
            lineLine(x1, y1, x2, y2, xb + wb, yb, xb + wb, yb + hb) ||
            lineLine(x1, y1, x2, y2, xb, yb + hb, xb + wb, yb + hb) ||
            lineLine(x1, y1, x2, y2, xb, yb, xb, yb + hb)
    }

    // helper functions

    function lineLineThickness(x1, y1, x2, y2, x3, y3, x4, y4, thickness1, thickness2)
    {
        if (thickness1 && thickness2)
        {
            return polygonPolygon(lineToPolygon(x1, y1, x2, y2, thickness1), lineToPolygon(x3, y3, x4, y4, thickness2))
        }
        else if (thickness1)
        {
            return linePolygon(x3, y3, x4, y4, lineToPolygon(x1, y1, x2, y2, thickness1))
        }
        else if (thickness2)
        {
            return linePolygon(x1, y1, x2, y2, lineToPolygon(x3, y3, x4, y4, thickness1))
        }
    }

    function distanceSquared(x1, y1, x2, y2)
    {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
    }

    function dot(v1, v2)
    {
        return (v1[0] * v2[0]) + (v1[1] * v2[1])
    }

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
    function ellipseLine(xe, ye, rex, rey, x1, y1, x2, y2)
    {
        lineEllipse(x1, y1, x2, y2, xe, ye, rex, rey);
    }

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
    function ellipsePoint(xe, ye, rex, rey, x1, y1)
    {
        const x = Math.pow(x1 - xe, 2) / (rex * rex);
        const y = Math.pow(y1 - ye, 2) / (rey * rey);
        return x + y <= 1
    }

    /**
     * ellipse-box (axis-oriented rectangle) collision
     * @param {number} xe center of ellipse
     * @param {number} ye center of ellipse
     * @param {radius} rex radius-x of ellipse
     * @param {radius} rey radius-y of ellipse
     * @param {number} xb top-left corner of box
     * @param {number} yb top-left corner of box
     * @param {number} wb width of box
     * @param {number} hb height of box
     */
    function ellipseBox(xe, ye, rex, rey, xb, yb, wb, hb)
    {
        return boxPoint(xb, yb, wb, hb, xe, ye) ||
            ellipseLine(xe, ye, rex, rey, xb, yb, xb + wb, yb) ||
            ellipseLine(xe, ye, rex, rey, xb, yb + hb, xb + wb, yb + hb) ||
            ellipseLine(xe, ye, rex, rey, xb, yb, xb, yb + hb) ||
            ellipseLine(xe, ye, rex, rey, xb + wb, yb, xb + wb, yb + hb)
    }

    /**
     * ellipse-polygon collision
     * @param {number} xe center of ellipse
     * @param {number} ye center of ellipse
     * @param {number} rex radius-x of ellipse
     * @param {number} rey radius-y of ellipse
     * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
     */
    function ellipsePolygon(xe, ye, rex, rey, points)
    {
        return polygonEllipse(points, xe, ye, rex, rey)
    }

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
    function ellipseCircle(xe, ye, rex, rey, xc, yc, rc)
    {
        if (!initialized)
        {
            initialize();
        }
        const x = Math.abs(xc - xe);
        const y = Math.abs(yc - ye);

        if (x * x + (rey - y) * (rey - y) <= rc * rc || (rex - x) * (rex - x) + y * y <= rc * rc || x * rey + y * rex <= rex * rey
            || ((x * rey + y * rex - rex * rey) * (x * rey + y * rex - rex * rey) <= rc * rc * (rex * rex + rey * rey) && x * rex - y * rey >= -rey * rey && x * rex - y * rey <= rex * rex))
        {
            return true
        }
        else
        {
            if ((x - rex) * (x - rex) + (y - rey) * (y - rey) <= rc * rc || (x <= rex && y - rc <= rey) || (y <= rey && x - rc <= rex))
            {
                return iterate(x, y, rex, 0, 0, rey, rc * rc)
            }
            return false
        }
    }

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
    function ellipseEllipse(x1, y1, r1x, r1y, x2, y2, r2x, r2y)
    {
        if (!initialized)
        {
            initialize();
        }

        var x = Math.abs(x2 - x1) * r2y;
        var y = Math.abs(y2 - y1) * r2x;
        r1x *= r2y;
        r1y *= r2x;
        var r = r2x * r2y;

        if (x * x + (r1y - y) * (r1y - y) <= r * r || (r1x - x) * (r1x - x) + y * y <= r * r || x * r1y + y * r1x <= r1x * r1y
            || ((x * r1y + y * r1x - r1x * r1y) * (x * r1y + y * r1x - r1x * r1y) <= r * r * (r1x * r1x + r1y * r1y) && x * r1x - y * r1y >= -r1y * r1y && x * r1x - y * r1y <= r1x * r1x))
        {
            return true
        }
        else
        {
            if ((x - r1x) * (x - r1x) + (y - r1y) * (y - r1y) <= r * r || (x <= r1x && y - r <= r1y) || (y <= r1y && x - r <= r1x))
            {
                return iterate(x, y, r1x, 0, 0, r1y, r * r)
            }
            return false
        }
    }

    // helper functions

    // from http://yehar.com/blog/?p=2926
    let MAX_ITERATIONS = 10;
    let innerPolygonCoef, outerPolygonCoef, initialized;

    function initialize()
    {
        innerPolygonCoef = [];
        outerPolygonCoef = [];
        for (var t = 0; t <= MAX_ITERATIONS; t++)
        {
            var numNodes = 4 << t;
            innerPolygonCoef[t] = 0.5 / Math.cos(4 * Math.acos(0) / numNodes);
            outerPolygonCoef[t] = 0.5 / (Math.cos(2 * Math.acos(0) / numNodes) * Math.cos(2 * Math.acos(0) / numNodes));
        }
        initialized = true;
    }

    function iterate(x, y, c0x, c0y, c2x, c2y, rr)
    {
        for (var t = 1; t <= MAX_ITERATIONS; t++)
        {
            var c1x = (c0x + c2x) * innerPolygonCoef[t];
            var c1y = (c0y + c2y) * innerPolygonCoef[t];
            var tx = x - c1x;
            var ty = y - c1y;
            if (tx * tx + ty * ty <= rr)
            {
                return true
            }
            var t2x = c2x - c1x;
            var t2y = c2y - c1y;
            if (tx * t2x + ty * t2y >= 0 && tx * t2x + ty * t2y <= t2x * t2x + t2y * t2y &&
                (ty * t2x - tx * t2y >= 0 || rr * (t2x * t2x + t2y * t2y) >= (ty * t2x - tx * t2y) * (ty * t2x - tx * t2y)))
            {
                return true
            }
            var t0x = c0x - c1x;
            var t0y = c0y - c1y;
            if (tx * t0x + ty * t0y >= 0 && tx * t0x + ty * t0y <= t0x * t0x + t0y * t0y &&
                (ty * t0x - tx * t0y <= 0 || rr * (t0x * t0x + t0y * t0y) >= (ty * t0x - tx * t0y) * (ty * t0x - tx * t0y)))
            {
                return true
            }
            var c3x = (c0x + c1x) * outerPolygonCoef[t];
            var c3y = (c0y + c1y) * outerPolygonCoef[t];
            if ((c3x - x) * (c3x - x) + (c3y - y) * (c3y - y) < rr)
            {
                c2x = c1x;
                c2y = c1y;
                continue
            }
            var c4x = c1x - c3x + c1x;
            var c4y = c1y - c3y + c1y;
            if ((c4x - x) * (c4x - x) + (c4y - y) * (c4y - y) < rr)
            {
                c0x = c1x;
                c0y = c1y;
                continue
            }
            var t3x = c3x - c1x;
            var t3y = c3y - c1y;
            if (ty * t3x - tx * t3y <= 0 || rr * (t3x * t3x + t3y * t3y) > (ty * t3x - tx * t3y) * (ty * t3x - tx * t3y))
            {
                if (tx * t3x + ty * t3y > 0)
                {
                    if (Math.abs(tx * t3x + ty * t3y) <= t3x * t3x + t3y * t3y || (x - c3x) * (c0x - c3x) + (y - c3y) * (c0y - c3y) >= 0)
                    {
                        c2x = c1x;
                        c2y = c1y;
                        continue
                    }
                } else if (-(tx * t3x + ty * t3y) <= t3x * t3x + t3y * t3y || (x - c4x) * (c2x - c4x) + (y - c4y) * (c2y - c4y) >= 0)
                {
                    c0x = c1x;
                    c0y = c1y;
                    continue
                }
            }
            return false
        }
        return false // Out of iterations so it is unsure if there was a collision. But have to return something.
    }

    /**
     * circleOutline-point collision
     * @param {number} xc center of circle
     * @param {number} yc center of circle
     * @param {radius} rc radius of circle
     * @param {number} x of point
     * @param {number} y of point
     * @param {number} thickness of circle outline
     */
    function circleOutlinePoint(xc, yc, rc, x, y, thickness = 1)
    {
        return circlePoint(xc, yc, rc, x, y) && !circlePoint(xc, yc, rc - thickness, x, y)
    }

    /**
     * circleOutline-line collision
     * @param {number} xc center of circle
     * @param {number} yc center of circle
     * @param {radius} rc radius of circle
     * @param {number} x1 of point 1 of line
     * @param {number} y1 of point 1 of line
     * @param {number} x2 of point 2 of line
     * @param {number} y2 of point 2 of line
     * @param {number} thickness of circle outline
     */
    function circleOutlineLine(xc, yc, rc, x1, y1, x2, y2, thickness = 1)
    {
        return lineCircle(x1, y1, x2, y2, xc, yc, rc) && !(circlePoint(xc, yc, rc - thickness, x1, y1) && circlePoint(xc, yc, rc - thickness, x2, y2))
    }

    /**
     * circleOutline-box (axis-aligned) collision
     * @param {number} xc center of circle
     * @param {number} yc center of circle
     * @param {radius} rc radius of circle
     * @param {number} x top-left corner of box
     * @param {number} y top-left corner of box
     * @param {number} width of box
     * @param {number} height of box
     * @param {number} thickness of circle outline
     */
    function circleOutlineBox(xc, yc, rc, x, y, width, height, thickness = 1)
    {
        let count = 0;
        count += circlePoint(xc, yc, rc, x, y) ? 1 : 0;
        count += circlePoint(xc, yc, rc, x + width, y) ? 1 : 0;
        count += circlePoint(xc, yc, rc, x, y + height) ? 1 : 0;
        count += circlePoint(xc, yc, rc, x + width, y + height) ? 1 : 0;

        // if no corners are inside the circle, then intersects only if box encloses circle-outline
        if (count === 0)
        {
            return boxCircle(x, y, width, height, xc, yc, rc)
        }

        // if one corner is inside and one corner is outside then box intersects circle-outline
        if (count >= 1 && count <= 3)
        {
            return true
        }

        // last check is if box is inside circle, need to check that a corner is not inside the inner circle
        if (count === 4)
        {
            return !circlePoint(xc, yc, rc - thickness, x, y) ||
                !circlePoint(xc, yc, rc - thickness, x + width, y) ||
                !circlePoint(xc, yc, rc - thickness, x, y + height) ||
                !circlePoint(xc, yc, rc - thickness, x + width, y + height)
        }
    }

    /**
     * point-box collision
     * @param {number} x1 point
     * @param {number} y1 point
     * @param {number} xb top-left corner of box
     * @param {number} yb top-left corner of box
     * @param {number} wb width of box
     * @param {number} hb height of box
     * @return {boolean}
     */
    function pointBox(x1, y1, xb, yb, wb, hb)
    {
        return boxPoint(xb, yb, wb, hb, x1, y1)
    }

    /**
     * polygon-point collision
     * based on https://stackoverflow.com/a/17490923/1955997
     * @param {number} x1
     * @param {number} y1
     * @param {number[]} points
     * @param {number} [tolerance=1] maximum distance of point to polygon's edges that triggers collision (see pointLine)
     * @return {boolean}
     */
    function pointPolygon(x1, y1, points, tolerance)
    {
        return polygonPoint(points, x1, y1, tolerance)
    }

    /**
     * point-line collision
     * @param {number} xp point
     * @param {number} yp point
     * @param {number} x1 first point in line
     * @param {number} y1 first point in line
     * @param {number} x2 second point in line
     * @param {number} y2 second point in line
     * @return {boolean}
     */
    function pointLine(xp, yp, x1, y1, x2, y2)
    {
        return linePoint(x1, y1, x2, y2, xp, yp)
    }

    /**
     * point-ellipse collision
     * @param {number} x1 point
     * @param {number} y1 point
     * @param {number} xe center of ellipse
     * @param {number} ye center of ellipse
     * @param {radius} rex radius-x of ellipse
     * @param {radius} rey radius-y of ellipse
     * @return {boolean}
     */
    function pointEllipse(x1, y1, xe, ye, rex, rey)
    {
        return ellipsePoint(xe, ye, rex, rey, x1, y1)
    }

    /**
     * point-circleOutline collision
     * @param {number} x of point
     * @param {number} y of point
     * @param {number} xc center of circle
     * @param {number} yc center of circle
     * @param {radius} rc radius of circle
     * @param {number} thickness of circle outline
     */
    function pointCircleOutline(x, y, xc, yc, rc, thickness)
    {
        return circleOutlinePoint(x, y, xc, yc, rc, thickness)
    }

    function pointCircle(x1, y1, xc, yc, rc)
    {
        return circlePoint(xc, yc, rc, x1, y1)
    }

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
        let x = x2 - x1;
        let y = y2 - y1;
        return x * x + y * y <= r1 * r1
    }

    /**
     * circle-line collision
     * from http://stackoverflow.com/a/10392860/1955997
     * @param {number} xc center of circle
     * @param {number} yc center of circle
     * @param {radius} rc radius of circle
     * @param {number} x1 first point of line
     * @param {number} y1 first point of line
     * @param {number} x2 second point of line
     * @param {number} y2 second point of line
     * @return {boolean}
     */
    function circleLine(xc, yc, rc, x1, y1, x2, y2)
    {
        return lineCircle(x1, y1, x2, y2, xc, yc, rc)
    }

    /**
     * circle-polygon collision
     * from http://stackoverflow.com/a/402019/1955997
     * @param {number} xc center of circle
     * @param {number} yc center of circle
     * @param {radius} rc radius of circle
     * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
     */
    function circlePolygon(xc, yc, rc, points)
    {
        return polygonCircle(points, xc, yc, rc)
    }

    /**
     * circle-box (axis-oriented rectangle) collision
     * from http://stackoverflow.com/a/402010/1955997
     * @param {number} xc center of circle
     * @param {number} yc center of circle
     * @param {radius} rc radius of circle
     * @param {number} xb top-left corner of rectangle
     * @param {number} yb top-left corner of rectangle
     * @param {number} wb width of rectangle
     * @param {number} hb height of rectangle
     */
    function circleBox(xc, yc, rc, xb, yb, wb, hb)
    {
        return boxCircle(xb, yb, wb, hb, xc, yc, rc)
    }

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
    function circleEllipse(xc, yc, rc, xe, ye, rex, rey)
    {
        return ellipseCircle(xe, ye, rex, rey, xc, yc, rc)
    }

    exports.circlePoint = circlePoint;
    exports.circleLine = circleLine;
    exports.circlePolygon = circlePolygon;
    exports.circleBox = circleBox;
    exports.circleEllipse = circleEllipse;
    exports.lineEllipse = lineEllipse;
    exports.lineLine = lineLine;
    exports.linePoint = linePoint;
    exports.linePolygon = linePolygon;
    exports.lineToPolygon = lineToPolygon;
    exports.lineCircle = lineCircle;
    exports.lineBox = lineBox;
    exports.ellipseLine = ellipseLine;
    exports.ellipsePoint = ellipsePoint;
    exports.ellipseBox = ellipseBox;
    exports.ellipsePolygon = ellipsePolygon;
    exports.ellipseCircle = ellipseCircle;
    exports.ellipseEllipse = ellipseEllipse;
    exports.boxBox = boxBox;
    exports.boxPolygon = boxPolygon;
    exports.boxPoint = boxPoint;
    exports.boxLine = boxLine;
    exports.boxEllipse = boxEllipse;
    exports.boxCircle = boxCircle;
    exports.pointBox = pointBox;
    exports.pointPolygon = pointPolygon;
    exports.pointLine = pointLine;
    exports.pointEllipse = pointEllipse;
    exports.pointCircleOutline = pointCircleOutline;
    exports.pointCircle = pointCircle;
    exports.polygonBox = polygonBox;
    exports.polygonPolygon = polygonPolygon;
    exports.polygonPoint = polygonPoint;
    exports.polygonLine = polygonLine;
    exports.polygonEllipse = polygonEllipse;
    exports.polygonCircle = polygonCircle;
    exports.circleOutlinePoint = circleOutlinePoint;
    exports.circleOutlineLine = circleOutlineLine;
    exports.circleOutlineBox = circleOutlineBox;

}));
