## intersects
shape collision / intersects library for pixi.js

## rationale
this is a simple libary that i designed for use with my game engine. most of the better collision libraries were too large or too heavily invested in physics. i wanted something simple that worked well with pixi.js.

## Code Example

    // point-Rectangle intersection

    var sprite = new PIXI.Sprite(texture);
    sprite.shape = new Intersects.Rectangle(sprite);
    sprite.position.set(5, 5);
    if (sprite.shape.collidesPoint(new PIXI.Point(10, 10)))
    {
        console.log('intersected');
    }

## Live Example
https://davidfig.github.io/intersects/

## Installation

    npm i yy-intersects

# API Reference
## Classes

<dl>
<dt><a href="#Circle">Circle</a></dt>
<dd><p>circle shape</p>
</dd>
<dt><a href="#Polygon">Polygon</a></dt>
<dd><p>Polygon</p>
</dd>
<dt><a href="#Rectangle">Rectangle</a></dt>
<dd></dd>
<dt><a href="#Shape">Shape</a></dt>
<dd><p>base class of all shapes</p>
</dd>
</dl>

<a name="Circle"></a>

## Circle
circle shape

**Kind**: global class  

* [Circle](#Circle)
    * [new Circle(article, [options])](#new_Circle_new)
    * [.set(options)](#Circle+set)
    * [.update()](#Circle+update)
    * [.collidesCircle(circle)](#Circle+collidesCircle) ⇒ <code>boolean</code>
    * [.collidesPoint(point)](#Circle+collidesPoint) ⇒ <code>boolean</code>
    * [.collidesLine(p1, p2)](#Circle+collidesLine) ⇒ <code>boolean</code>
    * [.collidesRectangle(rectangle)](#Circle+collidesRectangle)

<a name="new_Circle_new"></a>

### new Circle(article, [options])

| Param | Type | Description |
| --- | --- | --- |
| article | <code>Article</code> | that uses this shape |
| [options] | <code>object</code> | @see [Circle.set](Circle.set) |

<a name="Circle+set"></a>

### circle.set(options)
**Kind**: instance method of <code>[Circle](#Circle)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  |  |
| [options.positionObject] | <code>object</code> | <code>this.article</code> | use this to update position |
| [options.radius] | <code>number</code> |  | otherwise article.width / 2 is used as radius |

<a name="Circle+update"></a>

### circle.update()
update AABB

**Kind**: instance method of <code>[Circle](#Circle)</code>  
<a name="Circle+collidesCircle"></a>

### circle.collidesCircle(circle) ⇒ <code>boolean</code>
Does Circle collide with Circle?

**Kind**: instance method of <code>[Circle](#Circle)</code>  

| Param | Type |
| --- | --- |
| circle | <code>[Circle](#Circle)</code> | 

<a name="Circle+collidesPoint"></a>

### circle.collidesPoint(point) ⇒ <code>boolean</code>
Does Circle collide with point?

**Kind**: instance method of <code>[Circle](#Circle)</code>  

| Param | Type |
| --- | --- |
| point | <code>Point</code> | 

<a name="Circle+collidesLine"></a>

### circle.collidesLine(p1, p2) ⇒ <code>boolean</code>
Does Circle collide with a line?
from http://stackoverflow.com/a/10392860/1955997

**Kind**: instance method of <code>[Circle](#Circle)</code>  

| Param | Type |
| --- | --- |
| p1 | <code>Point</code> | 
| p2 | <code>Point</code> | 

<a name="Circle+collidesRectangle"></a>

### circle.collidesRectangle(rectangle)
Does circle collide with Rectangle?

**Kind**: instance method of <code>[Circle](#Circle)</code>  

| Param | Type |
| --- | --- |
| rectangle | <code>[Rectangle](#Rectangle)</code> | 

<a name="Polygon"></a>

## Polygon
Polygon

**Kind**: global class  

* [Polygon](#Polygon)
    * [new Polygon(article, points, [options])](#new_Polygon_new)
    * [.set(options)](#Polygon+set)
    * [.update()](#Polygon+update)
    * [.collidesRectangle(rectangle)](#Polygon+collidesRectangle) ⇒ <code>boolean</code>
    * [.collidesCircle(circle)](#Polygon+collidesCircle) ⇒ <code>boolean</code>

<a name="new_Polygon_new"></a>

### new Polygon(article, points, [options])

| Param | Type | Description |
| --- | --- | --- |
| article | <code>Article</code> | that uses this shape |
| points | <code>array</code> | in the form of [x, y, x2, y2, x3, y3, . . .] |
| [options] | <code>object</code> | @see [Polygon.set](Polygon.set) |

<a name="Polygon+set"></a>

### polygon.set(options)
**Kind**: instance method of <code>[Polygon](#Polygon)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.points | <code>Array.&lt;PIXI.Point&gt;</code> |  |
| [options.center] | <code>PIXI.DisplayObject</code> | object to use for position (and rotation, unless separately defined) |
| [options.rotation] | <code>PIXI.DisplayObject</code> | object to use for rotation instead of options.center or article |

<a name="Polygon+update"></a>

### polygon.update()
based on http://www.willperone.net/Code/coderr.php

**Kind**: instance method of <code>[Polygon](#Polygon)</code>  
<a name="Polygon+collidesRectangle"></a>

### polygon.collidesRectangle(rectangle) ⇒ <code>boolean</code>
Does Rectangle collide Rectangle?

**Kind**: instance method of <code>[Polygon](#Polygon)</code>  

| Param | Type |
| --- | --- |
| rectangle | <code>[Rectangle](#Rectangle)</code> | 

<a name="Polygon+collidesCircle"></a>

### polygon.collidesCircle(circle) ⇒ <code>boolean</code>
Does Rectangle collide Circle?

**Kind**: instance method of <code>[Polygon](#Polygon)</code>  

| Param | Type |
| --- | --- |
| circle | <code>[Circle](#Circle)</code> | 

<a name="Rectangle"></a>

## Rectangle
**Kind**: global class  

* [Rectangle](#Rectangle)
    * [new Rectangle(article, [options])](#new_Rectangle_new)
    * [.width](#Rectangle+width)
    * [.height](#Rectangle+height)
    * [.vertices](#Rectangle+vertices)
    * [.set(options)](#Rectangle+set)
    * [.update()](#Rectangle+update)
    * [.updateVertices()](#Rectangle+updateVertices)
    * [.collidesRectangle(rectangle)](#Rectangle+collidesRectangle) ⇒ <code>boolean</code>
    * [.collidesCircle(circle)](#Rectangle+collidesCircle) ⇒ <code>boolean</code>

<a name="new_Rectangle_new"></a>

### new Rectangle(article, [options])

| Param | Type | Description |
| --- | --- | --- |
| article | <code>object</code> | that uses this shape |
| [options] | <code>object</code> | @see [Rectangle.set](Rectangle.set) |

<a name="Rectangle+width"></a>

### rectangle.width
width of rectangle

**Kind**: instance property of <code>[Rectangle](#Rectangle)</code>  
<a name="Rectangle+height"></a>

### rectangle.height
height of rectangle

**Kind**: instance property of <code>[Rectangle](#Rectangle)</code>  
<a name="Rectangle+vertices"></a>

### rectangle.vertices
sets vertices Array[8]

**Kind**: instance property of <code>[Rectangle](#Rectangle)</code>  
<a name="Rectangle+set"></a>

### rectangle.set(options)
**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| [options.width] | <code>number</code> | width of object when aligned |
| [options.height] | <code>number</code> | height of object when aligned |
| [options.square] | <code>number</code> | side size of a square |
| [options.center] | <code>object</code> | object to use for position (and rotation, unless separately defined) |
| [options.rotation] | <code>object</code> | object to use for rotation instead of options.center or article |
| [options.noRotate] | <code>boolean</code> | object does not rotate (simplifies math) |

<a name="Rectangle+update"></a>

### rectangle.update()
based on http://www.willperone.net/Code/coderr.php
update AABB and sets vertices to dirty

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
<a name="Rectangle+updateVertices"></a>

### rectangle.updateVertices()
updates vertices automatically when dirty

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
<a name="Rectangle+collidesRectangle"></a>

### rectangle.collidesRectangle(rectangle) ⇒ <code>boolean</code>
Does Rectangle collide Rectangle?

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  

| Param | Type |
| --- | --- |
| rectangle | <code>[Rectangle](#Rectangle)</code> | 

<a name="Rectangle+collidesCircle"></a>

### rectangle.collidesCircle(circle) ⇒ <code>boolean</code>
Does Rectangle collide Circle?

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  

| Param | Type |
| --- | --- |
| circle | <code>[Circle](#Circle)</code> | 

<a name="Shape"></a>

## Shape
base class of all shapes

**Kind**: global class  

* [Shape](#Shape)
    * [new Shape([article])](#new_Shape_new)
    * _instance_
        * [.AABBs(AABB)](#Shape+AABBs)
        * [.collidesPoint(point)](#Shape+collidesPoint) ⇒ <code>boolean</code>
        * [.collidesPolygon(polygon, isAABB)](#Shape+collidesPolygon) ⇒ <code>boolean</code>
        * [.collidesLine(p1, p2)](#Shape+collidesLine) ⇒ <code>boolean</code>
        * [.collides()](#Shape+collides)
    * _static_
        * [.lineLine(p1, p2, p3, p4)](#Shape.lineLine) ⇒ <code>boolean</code>

<a name="new_Shape_new"></a>

### new Shape([article])

| Param | Type | Description |
| --- | --- | --- |
| [article] | <code>object</code> | that uses this shape |

<a name="Shape+AABBs"></a>

### shape.AABBs(AABB)
collides with this shape's AABB box

**Kind**: instance method of <code>[Shape](#Shape)</code>  

| Param | Type |
| --- | --- |
| AABB | <code>object</code> | 

<a name="Shape+collidesPoint"></a>

### shape.collidesPoint(point) ⇒ <code>boolean</code>
point-polygon collision test based on this.vertices
based on http://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon/2922778#2922778

**Kind**: instance method of <code>[Shape](#Shape)</code>  

| Param | Type |
| --- | --- |
| point | <code>Point</code> | 

<a name="Shape+collidesPolygon"></a>

### shape.collidesPolygon(polygon, isAABB) ⇒ <code>boolean</code>
Does Polygon collide Polygon or AABB?
based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles

**Kind**: instance method of <code>[Shape](#Shape)</code>  

| Param | Type |
| --- | --- |
| polygon | <code>Array</code> | 
| isAABB | <code>boolean</code> | 

<a name="Shape+collidesLine"></a>

### shape.collidesLine(p1, p2) ⇒ <code>boolean</code>
Does polygon collide Line?

**Kind**: instance method of <code>[Shape](#Shape)</code>  

| Param | Type |
| --- | --- |
| p1 | <code>Point</code> | 
| p2 | <code>Point</code> | 

<a name="Shape+collides"></a>

### shape.collides()
catch all for automatic collision checking

**Kind**: instance method of <code>[Shape](#Shape)</code>  
<a name="Shape.lineLine"></a>

### Shape.lineLine(p1, p2, p3, p4) ⇒ <code>boolean</code>
Do two lines intersect?
from http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type |
| --- | --- |
| p1 | <code>Point</code> | 
| p2 | <code>Point</code> | 
| p3 | <code>Point</code> | 
| p4 | <code>Point</code> | 


* * *

Copyright (c) 2016 YOPEY YOPEY LLC - MIT License - Documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)