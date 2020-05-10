## intersects

Collection of 2d collision/intersection checkers, supporting points, circles, circle circumferences (outline of circle), ellipses, lines, rectangles, and polygons (covex).

## Live Example
[https://davidfig.github.io/intersects/](https://davidfig.github.io/intersects/)

## Installation

```
npm i intersects
```
or
```
yarn add intersects
```

## Usage

```js
var intersects = require('intersects');

var intersected = intersects.boxBox(x1, y1, w1, h1, x2, y2, w2, h2);
```

or

```js
var circleBox = require('intersects/circle-box');

var intersected = circleBox(x, y, r, x1, y1, w1, h1);
```

## Alternative Usage
If you don't want to package the library using rollup, browserify, etc., you can also include the prepackaged library, which includes a global Intersects object:

```html
<script src="https://unpkg.com/intersects/umd/intersects.min.js"></script>
<script>
    var intersected = Intersects.polygonPoint(points, x, y);
</script>
```

## API

* box (AABB / axis-aligned rectangle)
    * [boxBox(x1, y1, w1, h1, x2, y2, w2, h2)](#boxboxx1-y1-w1-h1-x2-y2-w2-h2)
    * [boxCircle(xb, yb, wb, hb, xc, yc, rc)](#boxcirclexb-yb-wb-hb-xc-yc-rc) |
    * [boxEllipse(xb, yb, wb, hb, xe, ye, rex, rey)](#boxellipsexb-yb-wb-hb-xe-ye-rex-rey)
    * [boxLine(xb, yb, wb, hb, x1, y1, x2, y2)](#boxlinexb-yb-wb-hb-x1-y1-x2-y2)
    * [boxPoint(x1, y1, w1, h1, x2, y2)](#boxpointx1-y1-w1-h1-x2-y2)
    * [boxPolygon(xb, yb, wb, hb, points)](#boxpolygonxb-yb-wb-hb-points)
    * [boxCircleOutline(xb, yb, wb, hb, xc, yc, rc)](#boxCircleOutlinexb-yb-wb-hb-xc-yc-rc)
* circle
    * [circleBox(xc, yc, rc, xb, yb, wb, hb)](#circleboxxc-yc-rc-xb-yb-wb-hb)
    * [circleCircle(x1, y1, r1, x2, y2, r2)](#circlecirclex1-y1-r1-x2-y2-r2)
    * [circleEllipse(xc, yc, rc, xe, ye, rex, rey)](#circleellipsexc-yc-rc-xe-ye-rex-rey)
    * [circleLine(xc, yc, rc, x1, y1, x2, y2)](#circlelinexc-yc-rc-x1-y1-x2-y2)
    * [circlePoint(x1, y1, r1, x2, y2)](#circlepointx1-y1-r1-x2-y2)
    * [circlePolygon(xc, yc, rc, points, tolerance)](#circlepolygonxc-yc-rc-points)
    * (N/A) [circleCircleOutline(xc, yc, rc, xco, yco, rco)](#circleCircleOutlinexc-yc-rc-xco-yco-rco)
* line
    * [lineBox(x1, y1, x2, y2, xb, yb, wb, hb)](#lineboxx1-y1-x2-y2-xb-yb-wb-hb)
    * [lineCircle(x1, y1, x2, y2, xc, yc, rc)](#linecirclex1-y1-x2-y2-xc-yc-rc)
    * [lineEllipse(x1, y1, x2, y2, xe, ye, rex, rey)](#lineellipsex1-y1-x2-y2-xe-ye-rex-rey)
    * [lineLine(x1, y1, x2, y2, x3, y3, x4, y4)](#linelinex1-y1-x2-y2-x3-y3-x4-y4-thickness1-thickness2)
    * [linePolygon(x1, y1, x2, y2, points, tolerance)](#linepolygonx1-y1-x2-y2-points)
    * [linePoint(x1, y1, x2, y2, xp, yp)](#linepointx1-y1-x2-y2-xp-yp)
    * [lineCircleOutline(x1, y1, x2, y2, xc, yc, rc)](#lineCircleOutlinex1-y1-x2-y2-xc-yc-rc)
* point
    * [pointBox(x1, y1, xb, yb, wb, hb)](#pointboxx1-y1-xb-yb-wb-hb)
    * [pointPolygon(x1, y1, points)](#pointpolygonx1-y1-points)
    * [pointLine(xp, yp, x1, y1, x2, y2)](#pointlinexp-yp-x1-y1-x2-y2)
    * [pointCircle(xp, yp, xc, yc, rc)](#pointcirclexp-yp-xc-yc-rc)
    * [pointEllipse(xp, yp, xe, ye, rex, rey)](#pointellipsexp-yp-xe-ye-rex-rey)
    * [pointCircleOutline(x2, y2, x1, y1, r1)](#pointCircleOutliner1-x2-y2-x1-y1)
* polygon (convex)
    * [polygonBox(points, x, y, w, h)](#polygonboxpoints-x-y-w-h)
    * [polygonCircle(points, xc, yc, rc, tolerance)](#polygoncirclepoints-xc-yc-rc)
    * [polygonEllipse(points, xe, ye, rex, rey)](#polygonellipsepoints-xe-ye-rex-rey)
    * [polygonLine(points, x1, y1, x2, y2, tolerance)](#polygonlinepoints-x1-y1-x2-y2)
    * [polygonPoint(points, x, y)](#polygonpointpoints-x-y)
    * [polygonPolygon(points1, points2)](#polygonpolygonpoints1-points2)
* ellipse
    * [ellipseBox(xe, ye, rex, rey, x, y, w, h)](#ellipseboxxe-ye-rex-rey-x-y-w-h)
    * [ellipseCircle(xe, ye, rex, rey, xc, yc, rc)](#ellipsecirclexe-ye-rex-rey-xc-yc-rc)
    * [ellipseEllipse(x1, y1, r1x, r1y, x2, y2, r2x, r2y](#ellipseEllipse-x1-y1-r1x-r1y-x2-y2-r2x-r2y)
    * [ellipseLine(xe, ye, rex, rey, x1, y1, x2, y2)](#ellipselinexe-ye-rex-rey-x1-y1-x2-y2)
    * [ellipsePoint(xe, ye, rex, rey, x, y)](#ellipsepoint-xe-ye-rex-rey-x-y)
    * [ellipsePolygon(xe, ye, rex, rey, points2)](#ellipsepolygonxe-ye-rex-rey-points2)
* circleOutline (only the circumference of circle)
    * [circleOutlineBox(xc, yc, rc, xb, yb, wb, hb)](#circleOutlineBoxxc-yc-rc-xb-yb-wb-hb)
    * (N/A) [circleOutlineCircle(xco, yco, rco, xc, yc, rc)](#circleOutlineCirclex1-y1-r1-x2-y2-r2)
    * (N/A) [circleOutlineEllipse(xc, yc, rc, xe, ye, rex, rey)](#circleOutlineEllipsexc-yc-rc-xe-ye-rex-rey)
    * [circleOutlineLine(xc, yc, rc, x1, y1, x2, y2)](#circleOutlineLinexc-yc-rc-x1-y1-x2-y2)
    * [circleOutlinePoint(x1, y1, r1, x2, y2)](#circleOutlinePointx1-y1-r1-x2-y2)
    * (N/A) [circleOutlinePolygon(xc, yc, rc, points)](#circleOutlinePolygonxc-yc-rc-points)

---

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

### `boxEllipse(xb, yb, wb, hb, xe, ye, rex, rey)`

Box-ellipse collision.

Param | Meaning
---|---
`xb` | top-left corner of box
`yb` | top-left corner of box
`wb` | width of box
`hb` | height of box
`xe` | center of ellipse
`ye` | center of ellipse
`rex` | x-radius of ellipse
`rey` | y-radius of ellipse

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

Box-polygon (convex) collision.

Param | Meaning
---|---
`xb` | top-left corner of box
`yb` | top-left corner of box
`wb` | width of box
`hb` | height of box
`points` | `[x1, y1, x2, y2, ... xn, yn]` of polygon

---

### `boxCircleOutline(xb, yb, wb, hb, xc, yc, rc)`

Box (axis-oriented rectangle)-Circle outline (circumference of circle) collision.

Param | Meaning
---|---
`xb` | top-left corner of rectangle
`yb` | top-left corner of rectangle
`wb` | width of rectangle
`hb` | height of rectangle
`xc` | center of circle outline
`yc` | center of circle outline
`rc` | radius of circle outline

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

### `circleEllipse(xc, yc, rc, xe, ye, rex, rey)`

Circle-ellipse collision.

Param | Meaning
---|---
`x1` | center of circle
`y1` | center of circle
`r1` | radius of circle
`xe` | center of ellipse
`ye` | center of ellipse
`rex` | x-radius of ellipse
`rey` | y-radius of ellipse

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

Circle-polygon (convex) collision.

Param | Meaning
---|---
`xc` | center of circle
`yc` | center of circle
`rc` | radius of circle
`points` | `[x1, y1, x2, y2, ... xn, yn]` of polygon

---

### `circleCircleOutline(xc, yc, rc, xco, yco, rco)`

(Not available yet.) Circle-Circle outline (circumference of circle) collision.

Param | Meaning
---|---
`xc` | center of circle
`yc` | center of circle
`rc` | radius of circle
`xco` | center of circle outline
`yco` | center of circle outline
`rco` | radius of circle outline

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

### `lineEllipse(x1, y1, x2, y2, xe, ye, rex, rey)`

Line-ellipse collision.

Param | Meaning
---|---
`x1` | point 1 of line
`y1` | point 1 of line
`x2` | point 2 of line
`y2` | point 2 of line
`xe` | center of ellipse
`ye` | center of ellipse
`rex` | x-radius of ellipse
`rey` | y-radius of ellipse

---

### `lineLine(x1, y1, x2, y2, x3, y3, x4, y4, thickness1, thickness2)`

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
`thickness1` | of line 1 (the line is centered in its thickness--see demo)
`thickness2` | of line 2 (the line is centered in its thickness--see demo)

---

### `linePolygon(x1, y1, x2, y2, points, tolerance)`

Line-polygon (convex) collision.

Param | Meaning
---|---
`x1` | point 1 of line
`y1` | point 1 of line
`x2` | point 2 of line
`y2` | point 2 of line
`points` | `[x1, y1, x2, y2, ... xn, yn]` of polygon
`tolerance` | maximum distance of point to polygon's edges that triggers collision (see pointLine)
---

### `linePoint(x1, y1, x2, y2, xp, yp)`

Line-point collision.

Param | Meaning
---|---
`x1` | point 1 of line
`y1` | point 1 of line
`x2` | point 2 of line
`y2` | point 2 of line
`xp` | point x
`yp` | point y

---

### `lineCircleOutline(x1, y1, x2, y2, xc, yc, rc)`

Line-Circle outline (circumference of circle) collision.

Param | Meaning
---|---
`x1` | first point of line
`y1` | first point of line
`x2` | second point of line
`y2` | second point of line
`xc` | center of circle outline
`yc` | center of circle outline
`rc` | radius of circle outline

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

Point-polygon (convex) collision.

Param | Meaning
---|---
`x1` | point x
`y1` | point y
`points` | `[x1, y1, x2, y2, ... xn, yn]` of polygon

---

### `pointLine(xp, yp, x1, y1, x2, y2)`

point-line collision.

Param | Meaning
---|---
`xp` | point x
`yp` | point y
`x1` | point 1 of line
`y1` | point 1 of line
`x2` | point 2 of line
`y2` | point 2 of line

---

### `pointCircle(xp, yp, xc, yc, rc)`

point-circle collision.

Param | Meaning
---|---
`xp` | point x
`yp` | point y
`xc` | center of circle
`yc` | center of circle
`rc` | radius of circle

---

### `pointEllipse(xp, yp, xe, ye, rex, rey)`

point-ellipse collision.

Param | Meaning
---|---
`xp` | point x
`yp` | point y
`xe` | center of circle
`ye` | center of circle
`rex` | x-radius of circle
`rey` | y-radius of circle

---

### `pointCircleOutline(x2, y2, x1, y1, r1)`

Point-Circle outline (circumference of circle) collision.

Param | Meaning
---|---
`x1` | center of circle outline
`y1` | center of circle outline
`r1` | radius of circle outline
`x2` | point x
`y2` | point y

---

### `polygonBox(points, x, y, w, h)`

Polygon (convex)-box collision.

Param | Meaning
---|---
`points` | `[x1, y1, x2, y2, ... xn, yn]` of polygon
`x` | of box
`y` | of box
`w` | of box
`h` | of box

---

### `polygonCircle(points, xc, yc, rc)`

Polygon (convex)-circle collision.

Param | Meaning
---|---
`points` | `[x1, y1, x2, y2, ... xn, yn]` of polygon
`xc` | center of circle
`yc` | center of circle
`rc` | radius of circle

---

### `polygonEllipse(points, xe, ye, rex, rey)`

Polygon (convex)-ellipse collision.

Param | Meaning
---|---
`points` | `[x1, y1, x2, y2, ... xn, yn]` of polygon
`xe` | center of ellipse
`ye` | center of ellipse
`rex` | x-radius of ellipse
`rey` | y-radius of ellipse

---

### `polygonLine(points, x1, y1, x2, y2, tolerance)`

Polygon (convex)-line collisions.

Param | Meaning
---|---
`points` | `[x1, y1, x2, y2, ... xn, yn]` of polygon
`x1` | first point in line
`y1` | first point in line
`x2` | second point in line
`y2` | second point in line
`tolerance` | maximum distance of point to polygon's edges that triggers collision (see pointLine)

---

### `polygonPoint(points, x, y)`

Polygon (convex)-point collision.

Param | Meaning
---|---
`points` | `[x1, y1, x2, y2, ... xn, yn]` of polygon
`x` | of point
`y` | of point

---

### `polygonPolygon(points1, points2)`

Polygon (convex)-polygon (convex) collision.

Param | Meaning
---|---
`points1` | `[x1, y1, x2, y2, ... xn, yn]` of first polygon
`points2` | `[x1, y1, x2, y2, ... xn, yn]` of second polygon

---

### `ellipseBox(xe, ye, rex, rey, x, y, w, h)`

Ellipse-box collision.

Param | Meaning
---|---
`xe` | center of ellipse
`ye` | center of ellipse
`rex` | x-radius of ellipse
`rey` | y-radius of ellipse
`x` | of box
`y` | of box
`w` | of box
`h` | of box

---

### `ellipseCircle(xe, ye, rex, rey, xc, yc, rc)`

Ellipse-circle collision.

Param | Meaning
---|---
`xe` | center of ellipse
`ye` | center of ellipse
`rex` | x-radius of ellipse
`rey` | y-radius of ellipse
`xc` | center of circle
`yc` | center of circle
`rc` | radius of circle

---

### `ellipseEllipse(x1, y1, r1x, r1y, x2, y2, r2x, r2y)`

Ellipse-ellipse collision.

Param | Meaning
---|---
`x1` | center of ellipse 1
`y1` | center of ellipse 1
`r1x` | x-radius of ellipse 1
`r1y` | y-radius of ellipse 1
`x2` | center of ellipse 2
`y2` | center of ellipse 2
`r2x` | x-radius of ellipse 2
`r2y` | y-radius of ellipse 2

---

### `ellipseLine(xe, ye, rex, rey, x1, y1, x2, y2)`

Ellipse-line collisions.

Param | Meaning
---|---
`xe` | center of ellipse
`ye` | center of ellipse
`rex` | x-radius of ellipse
`rey` | y-radius of ellipse
`x1` | first point in line
`y1` | first point in line
`x2` | second point in line
`y2` | second point in line

---

### `ellipsePoint(xe, ye, rex, rey, x, y)`

Ellipse-point collision.

Param | Meaning
---|---
`xe` | center of ellipse
`ye` | center of ellipse
`rex` | x-radius of ellipse
`rey` | y-radius of ellipse
`x` | of point
`y` | of point

---

### `ellipsePolygon(xe, ye, rex, rey, points2)`

Ellipse-polygon (convex) collision.

Param | Meaning
---|---
`xe` | center of ellipse
`ye` | center of ellipse
`rex` | x-radius of ellipse
`rey` | y-radius of ellipse
`xe` | center of ellipse
`ye` | center of ellipse
`rex` | x-radius of ellipse
`rey` | y-radius of ellipse

---

### `circleOutlineBox(xc, yc, rc, xb, yb, wb, hb)`

Circle outline (circumference of circle)-box (axis-oriented rectangle) collision.

Param | Meaning
---|---
`xc` | center of circle outline
`yc` | center of circle outline
`rc` | radius of circle outline
`xb` | top-left corner of rectangle
`yb` | top-left corner of rectangle
`wb` | width of rectangle
`hb` | height of rectangle

---

### `circleOutlineCircle(xco, yco, rco, xc, yc, rc)`

Circle outline (circumference of circle)-circle collision.

Param | Meaning
---|---
`xco` | center of circle outline
`yco` | center of circle outline
`rco` | radius of circle outline
`xc` | center of circle
`yc` | center of circle
`rc` | radius of circle

---

### `circleOutlineEllipse(xc, yc, rc, xe, ye, rex, rey)`

(Not available yet.) Circle outline (circumference of circle)-ellipse collision.

Param | Meaning
---|---
`x1` | center of circle outline
`y1` | center of circle outline
`r1` | radius of circle outline
`xe` | center of ellipse
`ye` | center of ellipse
`rex` | x-radius of ellipse
`rey` | y-radius of ellipse

---

### `circleOutlineLine(xc, yc, rc, x1, y1, x2, y2)`

Circle outline (circumference of circle)-line collision.

Param | Meaning
---|---
`xc` | center of circle outline
`yc` | center of circle outline
`rc` | radius of circle outline
`x1` | first point of line
`y1` | first point of line
`x2` | second point of line
`y2` | second point of line

---

### `circleOutlinePoint(x1, y1, r1, x2, y2)`

Circle outline (circumference of circle)-point collision.

Param | Meaning
---|---
`x1` | center of circle outline
`y1` | center of circle outline
`r1` | radius of circle outline
`x2` | point x
`y2` | point y

---

### `circleOutlinePolygon(xc, yc, rc, points)`

(Not available yet.) Circle outline (circumference of circle)-polygon (convex) collision.

Param | Meaning
---|---
`xc` | center of circle outline
`yc` | center of circle outline
`rc` | radius of circle outline
`points` | `[x1, y1, x2, y2, ... xn, yn]` of polygon

## License

MIT License

(c) 2019 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)
