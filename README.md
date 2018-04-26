## intersects [![unstable](https://img.shields.io/badge/stability-unstable-green.svg)](http://github.com/badges/stability-badges)

Collection of 2d collision/intersection checkers, supporting points, circles, lines, rectangles, and polygons.

[**Live Example**](https://davidfig.github.io/intersects/)

## Installation

[![npm i intersects](https://nodei.co/npm/intersects.png?mini=true)](https://npmjs.org/package/intersects/)

## Usage

```js
var x = require('intersects');
var intersects = x.boxBox(x1, y1, w1, h1, x2, y2, w2, h2);
```

or

```js
var x = require('intersects/circle-box');
var intersects = x(x, y, r, x1, y1, w1, h1);
```

## API

### `boxBox(x1, y1, w1, h1, x2, y2, w2, h2)`

Box-box collision.

Param | Meaning
---|---
`x1` | top-left corner of first box
`y1` | top-left corner of first box
`w1` | width of first box
`h1` | height of first box
`x2` | top-left corner of second box
`y2` | top-left corner of second box
`w2` | width of second box
`h2` | height of second box

---

### `boxCircle(xb, yb, wb, hb, xc, yc, rc)`

Box-circle collision.

Param | Meaning
---|---
`xb` | top-left corner of box
`yb` | top-left corner of box
`wb` | width of box
`hb` | height of box
`xc` | center of circle
`yc` | center of circle
`rc` | radius of circle

---

### `boxLine(xb, yb, wb, hb, x1, y1, x2, y2)`

Box-line collision.

Param | Meaning
---|---
`xb` | top-left corner of box
`yb` | top-left corner of box
`wb` | width of box
`hb` | height of box
`x1` | first point of line
`y1` | first point of line
`x2` | second point of line
`y2` | second point of line

---

### `boxPoint(x1, y1, w1, h1, x2, y2)`

Box-point collision.

Param | Meaning
---|---
`x1` | top-left corner of box
`y1` | top-left corner of box
`w1` | width of box
`h1` | height of box
`x2` | point x
`y2` | point y

---

### `boxPolygon(xb, yb, wb, hb, points)`

Box-polygon collision.

Param | Meaning
---|---
`xb` | top-left corner of box
`yb` | top-left corner of box
`wb` | width of box
`hb` | height of box
`points` | `[x1, y1, x2, y2, ... xn, yn]` of polygon

---

### `circleBox(xc, yc, rc, xb, yb, wb, hb)`

Circle-box (axis-oriented rectangle) collision.

Param | Meaning
---|---
`xc` | center of circle
`yc` | center of circle
`rc` | radius of circle
`xb` | top-left corner of rectangle
`yb` | top-left corner of rectangle
`wb` | width of rectangle
`hb` | height of rectangle

---

### `circleCircle(x1, y1, r1, x2, y2, r2)`

Circle-circle collision.

Param | Meaning
---|---
`x1` | center of circle 1
`y1` | center of circle 1
`r1` | radius of circle 1
`x2` | center of circle 2
`y2` | center of circle 2
`r2` | radius of circle 2

---

### `circleLine(xc, yc, rc, x1, y1, x2, y2)`

Circle-line collision.

Param | Meaning
---|---
`xc` | center of circle
`yc` | center of circle
`rc` | radius of circle
`x1` | first point of line
`y1` | first point of line
`x2` | second point of line
`y2` | second point of line

---

### `circlePoint(x1, y1, r1, x2, y2)`

Circle-point collision.

Param | Meaning
---|---
`x1` | center of circle
`y1` | center of circle
`r1` | radius of circle
`x2` | point x
`y2` | point y

---

### `circlePolygon(xc, yc, rc, points)`

Circle-polygon collision.

Param | Meaning
---|---
`xc` | center of circle
`yc` | center of circle
`rc` | radius of circle
`points` | `[x1, y1, x2, y2, ... xn, yn]` of polygon

---

### `lineBox(x1, y1, x2, y2, xb, yb, wb, hb)`

Line-box collision.

Param | Meaning
---|---
`x1` | point 1 of line
`y1` | point 1 of line
`x2` | point 2 of line
`y2` | point 2 of line
`xb` | top-left of box
`yb` | top-left of box
`wb` | width of box
`hb` | height of box

---

### `lineCircle(x1, y1, x2, y2, xc, yc, rc)`

Line-circle collision.

Param | Meaning
---|---
`x1` | point 1 of line
`y1` | point 1 of line
`x2` | point 2 of line
`y2` | point 2 of line
`xc` | center of circle
`yc` | center of circle
`rc` | radius of circle

---

### `lineLine(x1, y1, x2, y2, x3, y3, x4, y4)`

Line-line collision.

Param | Meaning
---|---
`x1` | first point in line 1
`y1` | first point in line 1
`x2` | second point in line 1
`y2` | second point in line 1
`x3` | first point in line 2
`y3` | first point in line 2
`x4` | second point in line 2
`y4` | second point in line 2

---

### `linePolygon(x1, y1, x2, y2, points)`

Line-polygon collision.

Param | Meaning
---|---
`x1` | point 1 of line
`y1` | point 1 of line
`x2` | point 2 of line
`y2` | point 2 of line
`points` | `[x1, y1, x2, y2, ... xn, yn]` of polygon


---

### `pointBox(x1, y1, xb, yb, wb, hb)`

Point-box collision.

Param | Meaning
---|---
`x1` | point x
`y1` | point y
`xb` | top-left corner of box
`yb` | top-left corner of box
`wb` | width of box
`hb` | height of box


---

### `pointPolygon(x1, y1, points)`

Point-polygon collision.

Param | Meaning
---|---
`x1` | point x
`y1` | point y
`points` | `[x1, y1, x2, y2, ... xn, yn]` of polygon


---

### `polygonBox(points, x, y, w, h)`

Polygon-box collision.

Param | Meaning
---|---
`points` | `[x1, y1, x2, y2, ... xn, yn]` of polygon
`x` | of box
`y` | of box
`w` | of box
`h` | of box

---

### `polygonCircle(points, xc, yc, rc)`

Polygon-circle collision.

Param | Meaning
---|---
`points` | `[x1, y1, x2, y2, ... xn, yn]` of polygon
`xc` | center of circle
`yc` | center of circle
`rc` | radius of circle

---

### `polygonLine(points, x1, y1, x2, y2)`

Polygon-line collisions.

Param | Meaning
---|---
`points` | `[x1, y1, x2, y2, ... xn, yn]` of polygon
`x1` | first point in line
`y1` | first point in line
`x2` | second point in line
`y2` | second point in line

---

### `polygonPoint(points, x, y)`

Polygon-point collision.

Param | Meaning
---|---
`points` | `[x1, y1, x2, y2, ... xn, yn]` of polygon
`x` | of point
`y` | of point

---

### `polygonPolygon(points1, points2)`

Polygon-polygon collision.

Param | Meaning
---|---
`points1` | `[x1, y1, x2, y2, ... xn, yn]` of first polygon
`points2` | `[x1, y1, x2, y2, ... xn, yn]` of second polygon



## license

MIT License
(c) 2018 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)
