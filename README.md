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

/**
 * circle-polygon collision
 * from http://stackoverflow.com/a/402019/1955997
 * @param {number} x1 center of circle
 * @param {number} y1 center of circle
 * @param {radius} r1 radius of circle
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 */
function circlePolygon(x1, y1, r1, points)

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
 * polygon-point collision
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} x of point
 * @param {number} y of point
 */
function polygonPoint(points, x, y)

/**
 * polygon-polygon collision
 * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
 * @param {number[]} points1
 * @param {number[]} points2
 * @return {boolean}
 */
function polygonPolygon(points1, points2)

```
