## intersects
a simple collection of 2d collision/intersects functions, supporting points, circles, lines, axis-aligned boxes, and polygons

## rationale
I wanted a simplified collection of collision functions that work across different shapes. If you want a more advanced implementation designed for pixi.js. 

## Live Example
https://davidfig.github.io/simple-intersect/

## Installation

    npm i simple-intersect

## Usage
```js
    var intesect = require('simple-intersect');
    var intersected = intersect.boxBox(x1, y1, w1, h1, x2, y2, w2, h2);
```
or
```js
    var circleBox = require('simple-intersect/circle-box');
    var intersected = circleBox(x, y, r, x1, y1, w1, h1);
```

# API 
