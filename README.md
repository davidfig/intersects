## intersects
a simple collection of 2d collision/intersects functions, supporting points, circles, lines, axis-aligned boxes, and polygons

## rationale
I wanted a simplified collection of collision functions that work across various shapes. If you want a more advanced implementation designed for pixi.js, try out [yy-intersects](https://github.com/davidfig/intersects), which provides AABB boxes and mroe "permanent" collision objects designed to work with pixi.js. 

## Live Example
https://davidfig.github.io/simple-intersect/

## Installation

    npm i simple-intersect

# API 
```js
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

/**
 * box-polygon collision
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 * @param {number[]} points of polygon
 */
function boxPolygon(xb, yb, wb, hb, points)

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

/**
 * circle-polygon collision
 * from http://stackoverflow.com/a/402019/1955997
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 */
function circlePolygon(xc, yc, rc, points)

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

/**
 * line-polygon collision
 number @param {number} x1 point 1 of line
 number @param {number} y1 point 1 of line
 number @param {number} x2 point 2 of line
 number @param {number} y2 point 2 of line
 number @param {number[]} points of polygon
 */
function linePolygon(x1, y1, x2, y2, points)

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

/**
 * point-polygon collision
 * @param {number} x1
 * @param {number} y1
 * @param {number[]} points
 * @return {boolean}
 */
function pointPolygon(x1, y1, points)

/**
 * polygon-point collision
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} x of point
 * @param {number} y of point
 */
function polygonPoint(points, x, y)

/**
 * polygon-line collisions
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} x1 first point in line
 * @param {number} y1 first point in line
 * @param {number} x2 second point in line
 * @param {number} y2 second point in line
 * @return {boolean}
 */
function polygonLine(points, x1, y1, x2, y2)

/**
 * polygon-box collision
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} x of box
 * @param {number} y of box
 * @param {number} w of box
 * @param {number} h of box
 */
function polygonBox(points, x, y, w, h)

/**
 * polygon-polygon collision
 * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
 * @param {number[]} points1 [x1, y1, x2, y2, ... xn, yn] of first polygon
 * @param {number[]} points2 [x1, y1, x2, y2, ... xn, yn] of second polygon
 * @return {boolean}
 */
function polygonPolygon(points1, points2)

/**
 * polygon-circle collision
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {number} rc radius of circle
 */
function polygonCircle(points, xc, yc, rc)

```
