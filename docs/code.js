const PIXI = require('pixi.js')
const Renderer = require('yy-renderer')
const Ease = require('pixi-ease')
const Intersects = require('..')

let renderer, ease
setupRenderer()

const options = { reverse: true, repeat: true, ease: 'easeInOutSine' }
const TIME = 3000, SIZE = 100, DOT = 2, SHAPE = 50, RADIUS = 25, LINE = 2
let x = SHAPE, y = SHAPE

// set to true to test the reverse (e.g., pointCircle instead of circlePoint)
const REVERSE = false

circlePoint(); next()
circleCircle(); next()
circleLine(); next()
circleBox(); next()
circlePolygon(); next()
polygonPoint(); next()
polygonPolygon(); next()
polygonBox(); next()
boxPoint(); next()
boxBox(); next()
lineLine(); next()
lineBox(); next()

function circlePoint()
{
    const circle = drawCircle(x + SIZE / 2, y + SIZE / 2, RADIUS)
    const point = drawCircle(x, y, DOT, 0)
    const to = ease.to(point, { x: x + SIZE, y: y + SIZE }, TIME, { ease, repeat: true, reverse: true })
    if (REVERSE)
    {
        to.on('each', () => circle.tint = Intersects.pointCircle(point.x, point.y, circle.x, circle.y, RADIUS) ? 0xff0000 : 0x00ff00)
    }
    else
    {
        to.on('each', () => circle.tint = Intersects.circlePoint(circle.x, circle.y, RADIUS, point.x, point.y) ? 0xff0000 : 0x00ff00)
    }
    text('circlePoint')
}

function circleCircle()
{
    const c1 = drawCircle(x, y, RADIUS)
    const c2 = drawCircle(x + SIZE, y + SIZE, RADIUS)
    ease.to(c1, { x: x + SIZE, y: y + SIZE }, TIME, options)
    const to = ease.to(c2, { x: x, y: y }, TIME, options)
    to.on('each', () => c1.tint = c2.tint = Intersects.circleCircle(c1.x, c1.y, RADIUS, c2.x, c2.y, RADIUS) ? 0xff0000 : 0x00ff00)
    text('circleCircle')
}

function circleLine()
{
    const circle = drawCircle(x, y, RADIUS)
    const adjust = -SIZE * 0.1
    const l = { x1: x + SIZE / 2 - adjust, y1: y, x2: x + SIZE / 2 + adjust, y2: y + SIZE }
    const line = drawLine(l)
    const to = ease.to(circle, { x: x + SIZE, y: y + SIZE }, TIME, options)
    if (REVERSE)
    {
        to.on('each', () => line.tint = circle.tint = Intersects.lineCircle(l.x1, l.y1, l.x2, l.y2, circle.x, circle.y, RADIUS) ? 0xff0000 : 0x00ff00)
    }
    else
    {
        to.on('each', () => line.tint = circle.tint = Intersects.circleLine(circle.x, circle.y, RADIUS, l.x1, l.y1, l.x2, l.y2) ? 0xff0000 : 0x00ff00)
    }
    text('circleLine')
}

function circleBox()
{
    const c = drawCircle(x, y, RADIUS)
    const b = { x: x + SIZE / 2 - SHAPE / 2, y: y + SIZE / 2 - SHAPE / 2, w: SHAPE, h: SHAPE }
    const box = drawBox(b)
    const to = ease.to(c, { x: x + SIZE, y: y + SIZE }, TIME, options)
    if (REVERSE)
    {
        to.on('each', () => box.tint = c.tint = Intersects.boxCircle(b.x, b.y, b.w, b.h, c.x, c.y, RADIUS) ? 0xff0000 : 0x00ff00)
    }
    else
    {
        to.on('each', () => box.tint = c.tint = Intersects.circleBox(c.x, c.y, RADIUS, b.x, b.y, b.w, b.h) ? 0xff0000 : 0x00ff00)
    }
    text('circleBox')
}

function circlePolygon()
{
    const c = drawCircle(x, y, RADIUS)
    const points = [x + 30, y + 30, x + SIZE - 35, y + 15, x + SIZE - 15, y + SIZE - 40]
    const polygon = drawPolygon(points)
    const to = ease.to(c, { x: x + SIZE, y: y + SIZE }, TIME, options)
    if (REVERSE)
    {
        to.on('each', () => polygon.tint = c.tint = Intersects.polygonCircle(points, c.x, c.y, RADIUS) ? 0xff0000 : 0x00ff00)
    }
    else
    {
        to.on('each', () => polygon.tint = c.tint = Intersects.circlePolygon(c.x, c.y, RADIUS, points) ? 0xff0000 : 0x00ff00)
    }
    text('circlePolygon')
}

function boxPoint()
{
    const b = { x: x + SIZE / 2 - SHAPE / 2, y: y + SIZE / 2 - SHAPE / 2, w: SHAPE, h: SHAPE }
    const box = drawBox(b)
    const c = drawCircle(x, y, DOT)
    c.tint = 0
    const to = ease.to(c, { x: x + SIZE, y: y + SIZE }, TIME, options)
    if (REVERSE)
    {
        to.on('each', () => box.tint = Intersects.pointBox(c.x, c.y, b.x, b.y, b.w, b.h) ? 0xff0000 : 0x00ff00)
    }
    else
    {
        to.on('each', () => box.tint = Intersects.boxPoint(b.x, b.y, b.w, b.h, c.x, c.y) ? 0xff0000 : 0x00ff00)
    }
    text('boxPoint')
}

function boxBox()
{
    const b1 = { x, y, w: SHAPE, h: SHAPE }
    const box1 = drawBox(b1)
    const b2 = { x: x + SIZE, y: y + SIZE, w: SHAPE, h: SHAPE }
    const box2 = drawBox(b2)
    ease.to(box1, { x: x + SIZE, y: y + SIZE }, TIME, options)
    const to = ease.to(box2, { x, y }, TIME, options)
    to.on('each', () => box1.tint = box2.tint = Intersects.boxBox(box1.x, box1.y, SHAPE, SHAPE, box2.x, box2.y, SHAPE, SHAPE) ? 0xff0000 : 0x00ff00)
    text('boxBox')
}

function polygonPolygon()
{
    const p1 = drawBox({ x: 0, y: 0, w: SHAPE, h: SHAPE })
    p1.rotation = Math.PI / 4
    p1.anchor.set(0.5)
    p1.position.set(x, y)
    const p2 = drawBox({ x: 0, y: 0, w: SHAPE, h: SHAPE })
    p2.rotation = Math.PI / 4
    p2.anchor.set(0.5)
    p2.position.set(x + SIZE, y + SIZE)
    p2.tint = p1.tint = 0x0000ff
    ease.to(p1, {x: x + SIZE, y: y + SIZE, rotation: -Math.PI / 4}, TIME, options)
    const to = ease.to(p2, { x, y, rotation: -Math.PI / 4 }, TIME, options)
    to.on('each',
        function()
        {
            const half = p1.texture.width / 2
            const vertices = [p1.toGlobal({ x: -half, y: -half }), p1.toGlobal({ x: half, y: -half }), p1.toGlobal({ x: half, y: half }), p1.toGlobal({ x: -half, y: half })]
            const points1 = []
            for (let vertex of vertices)
            {
                points1.push(vertex.x, vertex.y)
            }
            const vertices2 = [p2.toGlobal({ x: -half, y: -half }), p2.toGlobal({ x: half, y: -half }), p2.toGlobal({ x: half, y: half }), p2.toGlobal({ x: -half, y: half })]
            const points2 = []
            for (let vertex of vertices2)
            {
                points2.push(vertex.x, vertex.y)
            }
            p1.tint = p2.tint = Intersects.polygonPolygon(points1, points2) ? 0xff0000 : 0x00ff00
        })
    text('polygonPolygon')
}

function polygonBox()
{
    const p1 = drawBox({ x: 0, y: 0, w: SHAPE, h: SHAPE })
    p1.rotation = Math.PI / 4
    p1.anchor.set(0.5)
    p1.position.set(x, y)
    const p2 = drawBox({ x: 0, y: 0, w: SHAPE, h: SHAPE })
    p2.position.set(x + SIZE, y + SIZE)
    p2.tint = p1.tint = 0x0000ff
    ease.to(p1, {x: x + SIZE, y: y + SIZE, rotation: -Math.PI / 4}, TIME, options)
    const to = ease.to(p2, { x, y }, TIME, options)
    to.on('each',
        function()
        {
            const half = p1.texture.width / 2
            const vertices = [p1.toGlobal({ x: -half, y: -half }), p1.toGlobal({ x: half, y: -half }), p1.toGlobal({ x: half, y: half }), p1.toGlobal({ x: -half, y: half })]
            const points1 = []
            for (let vertex of vertices)
            {
                points1.push(vertex.x, vertex.y)
            }
            if (REVERSE)
            {
                p1.tint = p2.tint = Intersects.boxPolygon(p2.x, p2.y, SHAPE, SHAPE, points1) ? 0xff0000 : 0x00ff00
            }
            else
            {
                p1.tint = p2.tint = Intersects.polygonBox(points1, p2.x, p2.y, SHAPE, SHAPE) ? 0xff0000 : 0x00ff00
            }
        })
    text('polygonBox')
}

function polygonPoint()
{
    const xPos = x + SIZE / 2 - SHAPE / 2
    const yPos = y + SIZE / 2 - SHAPE / 2
    const points = [xPos + SHAPE / 2, yPos, xPos, yPos + SHAPE, xPos + SHAPE, yPos + SHAPE]
    const polygon = drawPolygon(points)
    const c = drawCircle(x, y, DOT)
    c.tint = 0
    const to = ease.to(c, { x: x + SIZE, y: y + SIZE }, TIME, options)
    if (REVERSE)
    {
        to.on('each', () => polygon.tint = Intersects.pointPolygon(c.x, c.y, points) ? 0xff0000 : 0x00ff00)
    }
    else
    {
        to.on('each', () => polygon.tint = Intersects.polygonPoint(points, c.x, c.y) ? 0xff0000 : 0x00ff00)
    }
    text('polygonPoint')
}

function lineLine()
{
    const lines = renderer.addChild(new PIXI.Graphics())
    const l1 = { x1: x, y1: y, x2: x + SHAPE * 0.25, y2: y + SHAPE }
    const l2 = { x1: x + SIZE - SHAPE, y1: y + SIZE - SHAPE, x2: x + SIZE - SHAPE * 0.25, y2: y + SIZE}
    ease.to(l1, { x1: x + SIZE, y1: y + SIZE - SHAPE, x2: x + SIZE - SHAPE * 0.25, y2: y + SIZE }, TIME, options)
    const to = ease.to(l2, { x1: x, y1: y, x2: x + SHAPE * 0.25, y2: y + SHAPE }, TIME, options)
    to.on('each',
        function()
        {
            const color = Intersects.lineLine(l1.x1, l1.y1, l1.x2, l1.y2, l2.x1, l2.y1, l2.x2, l2.y2) ? 0xff0000 : 0x00ff00
            lines
                .clear()
                .lineStyle(DOT, color)
                .moveTo(l1.x1, l1.y1)
                .lineTo(l1.x2, l1.y2)
                .moveTo(l2.x1, l2.y1)
                .lineTo(l2.x2, l2.y2)
        })
    text('lineLine')
}

function lineBox()
{
    const adjust = -SIZE * 0.1
    const l = { x1: x + SIZE / 2 - adjust, y1: y, x2: x + SIZE / 2 + adjust, y2: y + SIZE }
    const line = drawLine(l)
    const box1 = drawBox({ x, y, w: SHAPE, h: SHAPE })
    const to = ease.to(box1, { x: x + SIZE, y: y + SIZE }, TIME, options)
    if (REVERSE)
    {
        to.on('each', () => box1.tint = line.tint = Intersects.boxLine(box1.x, box1.y, SHAPE, SHAPE, l.x1, l.y1, l.x2, l.y2) ? 0xff0000 : 0x00ff00)
    }
    else
    {
        to.on('each', () => box1.tint = line.tint = Intersects.lineBox(l.x1, l.y1, l.x2, l.y2, box1.x, box1.y, SHAPE, SHAPE) ? 0xff0000 : 0x00ff00)
    }
    text('lineBox')
}

function drawCircle(x, y, r, color)
{
    color = typeof color === 'undefined' ? 0xffffff : color
    const circle = renderer.add(new PIXI.Graphics())
    circle.beginFill(color).drawCircle(0, 0, r).endFill()
    circle.position.set(x, y)
    return circle
}

function drawLine(l, color)
{
    color = typeof color === 'undefined' ? 0xffffff : color
    const line = renderer.addChild(new PIXI.Graphics())
    line.lineStyle(LINE, color).moveTo(l.x1, l.y1).lineTo(l.x2, l.y2)
    return line
}

function drawBox(b, color)
{
    color = typeof color === 'undefined' ? 0xffffff : color
    const box = renderer.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
    box.tint = color
    box.width = b.w
    box.height = b.h
    box.position.set(b.x, b.y)
    return box
}

function drawPolygon(points, color)
{
    color = typeof color === 'undefined' ? 0xffffff : color
    const polygon = renderer.addChild(new PIXI.Graphics())
    polygon.beginFill(color).drawPolygon(points).endFill()
    return polygon
}

function text(text)
{
    const bg = renderer.add(new PIXI.Sprite(PIXI.Texture.WHITE))
    bg.tint = 0x888888
    const t = renderer.add(new PIXI.Text(text, { fill: 'white', fontSize: '1.5em' }))
    t.position.set(x + SIZE / 2 - t.width / 2, y + SHAPE + SIZE - t.height)
    bg.position = t.position
    bg.width = t.width
    bg.height = t.height
}

function next()
{
    x += SIZE + SHAPE
    if (x + SIZE + SHAPE >= window.innerWidth)
    {
        x = SHAPE
        y += SIZE + SHAPE * 2
    }
}

function setupRenderer()
{
    renderer = new Renderer({ debug: true, transparent: true, autoresize: true, alwaysRender: true })
    renderer.canvas.style.pointerEvents = 'none'
    renderer.canvas.style.position = 'fixed'
    renderer.canvas.style.opacity = 0.75
    ease = new Ease.list()
    ease.on('each', renderer.update, renderer)
}

require('./highlight')
