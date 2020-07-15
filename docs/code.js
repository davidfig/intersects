const PIXI = require('pixi.js')
const Ease = require('pixi-ease')
const Random = require('yy-random')
const calcFontSize = require('calc-fontsize')

require('./intersects.min.js');

const TESTS = 20, TIME = 1500

// set to true to test the reverse (e.g., pointCircle instead of circlePoint)
const REVERSE = false

let renderer, ease
let square, shape, radius, small, dot, speed, fontSize

function circlePoint(x, y)
{
    function change()
    {
        const angle = Random.angle()
        const distance = Random.get(square * 0.4)
        const xTo = x + square / 2 + Math.cos(angle) * distance
        const yTo = y + square / 2 + Math.sin(angle) * distance
        const to = ease.target(point, { x: xTo, y: yTo }, speed)
        to.on('each', () =>
            circle.tint = (REVERSE ? Intersects.pointCircle(point.x, point.y, circle.x, circle.y, radius) :
                Intersects.circlePoint(circle.x, circle.y, radius, point.x, point.y)) ? 0xff0000 : 0x00ff00)
        to.on('done', change)
    }
    const circle = drawCircle(x + square / 2, y + square / 2, radius)
    const point = drawCircle(x, y, dot, 0)
    change()
    text(REVERSE ? 'pointCircle()' : 'circlePoint()', x, y)
}

function circleCircle(x, y)
{
    function change()
    {
        const angle = Random.angle()
        const distance = Random.get(square * 0.4)
        const xTo = x + square / 2 + Math.cos(angle) * distance
        const yTo = y + square / 2 + Math.sin(angle) * distance
        const to = ease.target(c2, { x: xTo, y: yTo }, speed)
        to.on('each', () => c1.tint = c2.tint = Intersects.circleCircle(c1.x, c1.y, small, c2.x, c2.y, small) ? 0xff0000 : 0x00ff00)
        to.on('done', change)
    }
    const c1 = drawCircle(x + square / 2, y + square / 2, small)
    const c2 = drawCircle(x + Random.range(small, square - small), y + Random.range(small, square - small), small)
    change()
    text('circleCircle()', x, y)
}

function circleLine(x, y)
{
    function change()
    {
        const to = ease.to(line, { x1: Random.range(x, x + square), y1: Random.range(y, y + square), x2: Random.range(x, x + square), y2: Random.range(y, y + square) }, TIME)
        to.on('each', () =>
            {
                circle.tint = (REVERSE ? Intersects.lineCircle(line.x1, line.y1, line.x2, line.y2, circle.x, circle.y, radius) :
                    Intersects.circleLine(circle.x, circle.y, radius, line.x1, line.y1, line.x2, line.y2)) ? 0xff0000 : 0x00ff00
                g.clear().lineStyle(dot, circle.tint).moveTo(line.x1, line.y1).lineTo(line.x2, line.y2)
            })
        to.on('done', change)
    }
    const circle = drawCircle(x + square / 2, y + square / 2, radius)
    const line = { x1: Random.range(x, x + square), y1: Random.range(y, y + square), x2: Random.range(x, x + square), y2: Random.range(y, y + square) }
    const g = renderer.stage.addChild(new PIXI.Graphics())
    change()
    text(REVERSE ? 'lineCircle()' : 'circleLine()', x, y)
}

function circleBox(x, y)
{
    function change()
    {
        const to = ease.target(c, { x: Random.range(x + small, x + square - small), y: Random.range(y + small, y + square - small) }, speed)
        to.on('each', () => box.tint = c.tint = (REVERSE ? Intersects.boxCircle(b.x, b.y, b.w, b.h, c.x, c.y, small) :
            Intersects.circleBox(c.x, c.y, small, b.x, b.y, b.w, b.h))? 0xff0000 : 0x00ff00)
        to.on('done', change)
    }
    const c = drawCircle(Random.range(x + small, x + square - small), Random.range(y + small, y + square - small), small)
    const b = { x: x + square / 2 - small, y: y + square / 2 -small, w: small * 2, h: small * 2 }
    const box = drawBox(b)
    change()
    text(REVERSE ? 'boxCircle()' : 'circleBox()', x, y)
}

function circlePolygon(x, y)
{
    function change()
    {
        const to = ease.target(c, { x: Random.range(x + small, x + square - small), y: Random.range(y + small, y + square - small) }, speed)
        to.on('each', () => polygon.tint = c.tint = (REVERSE ? Intersects.polygonCircle(points, c.x, c.y, small) :
            Intersects.circlePolygon(c.x, c.y, small, points))? 0xff0000 : 0x00ff00)
        to.on('done', change)
    }
    const c = drawCircle(x, y, small)
    const points = [x + square * 0.4, y + square * 0.3, x + square * 0.6, y + square * 0.2, x + square * 0.7, y + square * 0.7 ]
    const polygon = drawPolygon(points)
    change()
    text(REVERSE ? 'polygonCircle()' : 'circlePolygon()', x, y)
}

function boxPoint(x, y)
{
    function change()
    {
        const to = ease.target(c, { x: Random.range(x, x + square), y: Random.range(y, y + square) }, speed)
        to.on('each', () => box.tint = (REVERSE ? Intersects.pointBox(c.x, c.y, b.x, b.y, b.w, b.h) :
            Intersects.boxPoint(b.x, b.y, b.w, b.h, c.x, c.y)) ? 0xff0000 : 0x00ff00)
        to.on('done', change)
    }
    const b = { x: x + square / 2 - shape / 2, y: y + square / 2 - shape / 2, w: shape, h: shape }
    const box = drawBox(b)
    const c = drawCircle(x, y, dot)
    c.tint = 0
    change()
    text(REVERSE ? 'pointBox()' :  'boxPoint()', x, y)
}

function boxBox(x, y)
{
    function change()
    {
        const to = ease.target(box2, { x: Random.range(x, x + square - small), y: Random.range(y, y + square - small) }, speed)
        to.on('each', () => box1.tint = box2.tint = Intersects.boxBox(box1.x, box1.y, small, small, box2.x, box2.y, small, small) ? 0xff0000 : 0x00ff00)
        to.on('done', change)
    }
    let small = square * 0.2
    const box1 = drawBox({ x: x + square / 2 - small / 2, y: y + square / 2 - small / 2, w: small, h: small })
    const box2 = drawBox({ x: x + square, y: y + square, w: small, h: small })
    change()
    text('boxBox()', x, y)
}

function polygonPolygon(x, y)
{
    function change()
    {
        const to = ease.target(p2, { x: Random.range(x + small, x + square - small), y: Random.range(y + small, y + square - small) }, speed)
        to.on('each', () =>
            {
                const vertices2 = [p2.toGlobal({ x: -half, y: -half }), p2.toGlobal({ x: half, y: -half }), p2.toGlobal({ x: half, y: half }), p2.toGlobal({ x: -half, y: half })]
                const points2 = []
                for (let vertex of vertices2)
                {
                    points2.push(vertex.x, vertex.y)
                }
                p1.tint = p2.tint = Intersects.polygonPolygon(points1, points2) ? 0xff0000 : 0x00ff00
            })
        to.on('done', change)
    }
    let small = square * 0.2
    const p1 = drawBox({ x: x + square / 2, y: y + square / 2, w: small, h: small })
    p1.rotation = Math.PI / 4
    p1.anchor.set(0.5)
    const half = p1.texture.width / 2
    const vertices = [p1.toGlobal({ x: -half, y: -half }), p1.toGlobal({ x: half, y: -half }), p1.toGlobal({ x: half, y: half }), p1.toGlobal({ x: -half, y: half })]
    const points1 = []
    for (let vertex of vertices)
    {
        points1.push(vertex.x, vertex.y)
    }
    const p2 = drawBox({ x: 0, y: 0, w: small, h: small })
    p2.rotation = Math.PI / 4
    p2.anchor.set(0.5)
    p2.position.set(x + square, y + square)
    p2.tint = p1.tint = 0x0000ff
    ease.to(p2, { rotation: -Math.PI / 4 }, TIME, { repeat: true })
    change()
    text('polygonPolygon()', x, y)
}

function polygonBox(x, y)
{
    function change()
    {
        const to = ease.target(p2, { x: Random.range(x, x + square - small), y: Random.range(y, y + square - small) }, speed)
            to.on('each', () =>
            {
                const half = p2.texture.width / 2
                const vertices = [p2.toGlobal({ x: -half, y: -half }), p2.toGlobal({ x: half, y: -half }), p2.toGlobal({ x: half, y: half }), p2.toGlobal({ x: -half, y: half })]
                const points = []
                for (let vertex of vertices)
                {
                    points.push(vertex.x, vertex.y)
                }
                p1.tint = p2.tint = (REVERSE ? Intersects.boxPolygon(p1.x, p1.y, small, small, points) :
                    Intersects.polygonBox(points, p1.x, p1.y, small, small)) ? 0xff0000 : 0x00ff00
            })
        to.on('done', change)
    }
    let small = square * 0.2
    const p1 = drawBox({ x: x + square / 2 - small / 2, y: y + square / 2 - small / 2, w: small, h: small })
    const p2 = drawBox({ x: Random.range(x + small, x + square - small), y: Random.range(y + small, y + square - small), w: small, h: small })
    p2.anchor.set(0.5)
    ease.to(p2, { rotation: 2 * Math.PI }, TIME, { repeat: true })
    p2.tint = p1.tint = 0x00ff00
    change()
    text(REVERSE ? 'boxPolygon()' : 'polygonBox()', x, y)
}

function polygonPoint(x, y)
{
    function change()
    {
        const to = ease.target(c, { x: Random.range(x + small, x + square - small), y: Random.range(y + small, y + square - small) }, speed)
        to.on('each', () => polygon.tint = (REVERSE ? Intersects.pointPolygon(c.x, c.y, points) :
            Intersects.polygonPoint(points, c.x, c.y)) ? 0xff0000 : 0x00ff00)
        to.on('done', change)
    }
    const xPos = x + square / 2 - shape / 2
    const yPos = y + square / 2 - shape / 2
    const points = [xPos + shape / 2, yPos, xPos, yPos + shape, xPos + shape, yPos + shape]
    const polygon = drawPolygon(points)
    const c = drawCircle(x, y, dot)
    c.tint = 0
    change()
    text(REVERSE ? 'pointPolygon()' : 'polygonPoint()', x, y)
}

function lineLine(x, y)
{
    function change()
    {
        ease.to(l1, { x1: Random.range(x, x + square), y1: Random.range(y, y + square), x2: Random.range(x, x + square), y2: Random.range(y, y + square) }, TIME)
        const to = ease.to(l2, { x1: Random.range(x, x + square), y1: Random.range(y, y + square), x2: Random.range(x, x + square), y2: Random.range(y, y + square) }, TIME)
        const thickness = dot
        to.on('each', () =>
            {
            const color = Intersects.lineLine(l1.x1, l1.y1, l1.x2, l1.y2, l2.x1, l2.y1, l2.x2, l2.y2) ? 0xff0000 : 0x00ff00
                lines
                    .clear()
                    .lineStyle(thickness, color)
                    .moveTo(l1.x1, l1.y1)
                    .lineTo(l1.x2, l1.y2)
                    .moveTo(l2.x1, l2.y1)
                    .lineTo(l2.x2, l2.y2)
            })
        to.on('done', change)
    }
    const lines = renderer.stage.addChild(new PIXI.Graphics())
    const l1 = { x1: Random.range(x, x + square), y1: Random.range(y, y + square), x2: Random.range(x, x + square), y2: Random.range(y, y + square) }
    const l2 = { x1: Random.range(x, x + square), y1: Random.range(y, y + square), x2: Random.range(x, x + square), y2: Random.range(y, y + square) }
    change()
    text('lineLine()', x, y)
}

function lineLineThickness(x, y)
{
    function change()
    {
        ease.to(l1, { x1: Random.range(x, x + square), y1: Random.range(y, y + square), x2: Random.range(x, x + square), y2: Random.range(y, y + square) }, TIME)
        const to = ease.to(l2, { x1: Random.range(x, x + square), y1: Random.range(y, y + square), x2: Random.range(x, x + square), y2: Random.range(y, y + square) }, TIME)
        const thickness = 30
        to.on('each', () =>
            {
            const color = Intersects.lineLine(l1.x1, l1.y1, l1.x2, l1.y2, l2.x1, l2.y1, l2.x2, l2.y2, thickness, thickness) ? 0xff0000 : 0x00ff00
                lines
                    .clear()
                    .lineStyle(thickness, color)
                    .moveTo(l1.x1, l1.y1)
                    .lineTo(l1.x2, l1.y2)
                    .moveTo(l2.x1, l2.y1)
                    .lineTo(l2.x2, l2.y2)
                    .lineStyle(dot, 'black')
                    .moveTo(l1.x1, l1.y1)
                    .lineTo(l1.x2, l1.y2)
                    .moveTo(l2.x1, l2.y1)
                    .lineTo(l2.x2, l2.y2)
            })
        to.on('done', change)
    }
    const lines = renderer.stage.addChild(new PIXI.Graphics())
    const l1 = { x1: Random.range(x, x + square), y1: Random.range(y, y + square), x2: Random.range(x, x + square), y2: Random.range(y, y + square) }
    const l2 = { x1: Random.range(x, x + square), y1: Random.range(y, y + square), x2: Random.range(x, x + square), y2: Random.range(y, y + square) }
    change()
    text('lineLine(thickness)', x, y)
}

function lineBox(x, y)
{
    function change()
    {
        const to = ease.to(l, { x1: Random.range(x, x + square), y1: Random.range(y, y + square), x2: Random.range(x, x + square), y2: Random.range(y, y + square) }, TIME)
        to.on('each', () =>
            {
                box1.tint = (REVERSE ? Intersects.boxLine(box1.x, box1.y, shape, shape, l.x1, l.y1, l.x2, l.y2) :
                    Intersects.boxLine(box1.x, box1.y, shape, shape, l.x1, l.y1, l.x2, l.y2)) ? 0xff0000 : 0x00ff00
                line.clear().lineStyle(dot, box1.tint).moveTo(l.x1, l.y1).lineTo(l.x2, l.y2)
            })
        to.on('done', change)
    }
    const line = renderer.stage.addChild(new PIXI.Graphics())
    const l = { x1: Random.range(x, x + square), y1: Random.range(y, y + square), x2: Random.range(x, x + square), y2: Random.range(y, y + square) }
    const box1 = drawBox({ x: x + square / 2 - shape / 2, y: y + square / 2 - shape / 2, w: shape, h: shape })
    change()
    text(REVERSE ? 'boxLine()' : 'lineBox()', x, y)
}

function linePoint(x, y)
{
    function changeLine()
    {
        const toLine = ease.to(l, { x1: Random.range(x, x + square), y1: Random.range(y, y + square), x2: Random.range(x, x + square), y2: Random.range(y, y + square) }, TIME)
        toLine.on('each', () =>
        {
            const tint = (REVERSE ? Intersects.pointLine(point.x, point.y, l.x1, l.y1, l.x2, l.y2) :
                Intersects.pointLine(point.x, point.y, l.x1, l.y1, l.x2, l.y2)) ? 0xff0000 : 0x00ff00
            line.clear().lineStyle(dot, tint).moveTo(l.x1, l.y1).lineTo(l.x2, l.y2)
        })
        toLine.on('done', changeLine)
    }
    function changePoint()
    {
        const to = ease.target(point, { x: Random.range(x, x + square), y: Random.range(y, y + square) }, speed)
        to.on('done', changePoint)
    }
    const l = { x1: Random.range(x, x + square), y1: Random.range(y, y + square), x2: Random.range(x, x + square), y2: Random.range(y, y + square) }
    const line = renderer.stage.addChild(new PIXI.Graphics())
    const point = drawCircle(x, y, dot, 0)
    point.tint = 0
    changeLine()
    changePoint()
    text(REVERSE ? 'pointLine()' : 'linePoint()', x, y)
}

function ellipsePoint(x, y)
{
    function changeEllipse()
    {
        const rw = Random.range(shape * 0.25, shape)
        const rh = Random.range(shape * 0.25, shape)
        const to = ease.to(ellipse, { rw, rh }, TIME)
        to.on('done', changeEllipse)
    }

    function change()
    {
        const angle = Random.angle()
        const distance = Random.get(square * 0.4)
        const xTo = x + square / 2 + Math.cos(angle) * distance
        const yTo = y + square / 2 + Math.sin(angle) * distance
        const to = ease.target(point, { x: xTo, y: yTo }, speed)
        to.on('each', () =>
        {
            const tint = (REVERSE ? Intersects.pointEllipse(point.x, point.y, ellipse.x, ellipse.y, ellipse.rw, ellipse.rh) :
                Intersects.ellipsePoint(ellipse.x, ellipse.y, ellipse.rw, ellipse.rh, point.x, point.y)) ? 0xff0000 : 0x00ff00
            g.clear().beginFill(tint).drawEllipse(ellipse.x, ellipse.y, ellipse.rw, ellipse.rh)
        })
        to.on('done', change)
    }
    const g = renderer.stage.addChild(new PIXI.Graphics())
    const ellipse = { x: x + square / 2, y: y + square / 2, rw: Random.range(shape * 0.25, shape), rh: Random.range(shape * 0.25, shape) }
    const point = drawCircle(x, y, dot, 0)
    change()
    changeEllipse()
    text(REVERSE ? 'pointEllipse()' : 'ellipsePoint()', x, y)
}

function ellipseLine(x, y)
{
    function changeEllipse()
    {
        const rw = Random.range(shape * 0.25, shape)
        const rh = Random.range(shape * 0.25, shape)
        const to = ease.to(ellipse, { rw, rh }, TIME)
        to.on('done', changeEllipse)
    }

    function changeLine()
    {
        const to = ease.to(line, { x1: Random.range(x, x + square), y1: Random.range(y, y + square), x2: Random.range(x, x + square), y2: Random.range(y, y + square) }, TIME)
        to.on('each', () =>
        {
            const tint = (REVERSE ? Intersects.lineEllipse(line.x1, line.y1, line.x2, line.y2, ellipse.x, ellipse.y, ellipse.rw, ellipse.rh) :
                Intersects.ellipseLine(ellipse.x, ellipse.y, ellipse.rw, ellipse.rh, line.x1, line.y1, line.x2, line.y2)) ? 0xff0000 : 0x00ff00
            g.clear()
                .lineStyle(dot, tint).moveTo(line.x1, line.y1).lineTo(line.x2, line.y2)
                .beginFill(tint).drawEllipse(ellipse.x, ellipse.y, ellipse.rw, ellipse.rh).endFill()
        })
        to.on('done', changeLine)
    }

    const g = renderer.stage.addChild(new PIXI.Graphics())
    const ellipse = { x: x + square / 2, y: y + square / 2, rw: Random.range(shape * 0.25, shape), rh: Random.range(shape * 0.25, shape) }
    const line = { x1: x + Random.get(square), y1: y + Random.get(square), x2: x + Random.get(square), y2: y + Random.get(square) }
    changeLine()
    changeEllipse()
    text(REVERSE ? 'lineEllipse()' : 'ellipseline()', x, y)
}

function ellipseBox(x, y)
{
    function change()
    {
        const rw = Random.range(shape * 0.1, shape)
        const rh = Random.range(shape * 0.1, shape)
        const to = ease.to(e, { x: Random.range(x + rw, x + square - rw), y: Random.range(y + rh, y + square - rh), rw, rh }, TIME)
        to.on('each', () =>
        {
            box.tint = (REVERSE ?
                Intersects.boxEllipse(b.x, b.y, b.w, b.h, e.x, e.y, e.rw, e.rh) :
                Intersects.ellipseBox(e.x, e.y, e.rw, e.rh, b.x, b.y, b.w, b.h)) ? 0xff0000 : 0x00ff00
            g.clear().beginFill(box.tint).drawEllipse(e.x, e.y, e.rw, e.rh).endFill()
        })
        to.on('done', change)
    }
    const g = renderer.stage.addChild(new PIXI.Graphics())
    const b = { x: x + square / 2 - small, y: y + square / 2 - small, w: small * 2, h: small * 2 }
    const box = drawBox(b)
    const rw = Random.range(shape * 0.1, shape)
    const rh = Random.range(shape * 0.1, shape)
    const e = { x: Random.range(x + rw, x + square - rw), y: Random.range(y + rh, y + square - rh), rw, rh }
    change()
    text(REVERSE ? 'boxEllipse()' : 'ellipseBox()', x, y)
}

function ellipseCircle(x, y)
{
    function change()
    {
        const rw = Random.range(shape * 0.1, shape)
        const rh = Random.range(shape * 0.1, shape)
        const to = ease.to(e, { x: Random.range(x + rw, x + square - rw), y: Random.range(y + rh, y + square - rh), rw, rh }, TIME)
        to.on('each', () =>
        {
            circle.tint = (REVERSE ?
                Intersects.circleEllipse(c.x, c.y, c.r, e.x, e.y, e.rw, e.rh) :
                Intersects.ellipseCircle(e.x, e.y, e.rw, e.rh, c.x, c.y, c.r)) ? 0xff0000 : 0x00ff00
            g.clear().beginFill(circle.tint).drawEllipse(e.x, e.y, e.rw, e.rh).endFill()
        })
        to.on('done', change)
    }
    const g = renderer.stage.addChild(new PIXI.Graphics())
    const c = { x: x + square / 2 - small / 2, y: y + square / 2 - small / 2, r: small }
    const circle = drawCircle(c.x, c.y, c.r)
    const rw = Random.range(shape * 0.1, shape)
    const rh = Random.range(shape * 0.1, shape)
    const e = { x: Random.range(x + rw, x + square - rw), y: Random.range(y + rh, y + square - rh), rw, rh }
    change()
    text(REVERSE ? 'circleEllipse()' : 'ellipseCircle()', x, y)
}

function ellipsePolygon(x, y)
{
    function change()
    {
        const rw = Random.range(shape * 0.1, shape)
        const rh = Random.range(shape * 0.1, shape)
        const to = ease.to(e, { x: Random.range(x + rw, x + square - rw), y: Random.range(y + rh, y + square - rh), rw, rh }, TIME)
        to.on('each', () =>
        {
            polygon.tint = (REVERSE ?
                Intersects.polygonEllipse(points, e.x, e.y, e.rw, e.rh) :
                Intersects.ellipsePolygon(e.x, e.y, e.rw, e.rh, points)) ? 0xff0000 : 0x00ff00
            g.clear().beginFill(polygon.tint).drawEllipse(e.x, e.y, e.rw, e.rh).endFill()
        })
        to.on('done', change)
    }
    const g = renderer.stage.addChild(new PIXI.Graphics())
    const xPos = x + square / 2 - shape / 2
    const yPos = y + square / 2 - shape / 2
    const points = [xPos + shape / 2, yPos, xPos, yPos + shape, xPos + shape, yPos + shape]
    const polygon = drawPolygon(points)
    const rw = Random.range(shape * 0.1, shape)
    const rh = Random.range(shape * 0.1, shape)
    const e = { x: Random.range(x + rw, x + square - rw), y: Random.range(y + rh, y + square - rh), rw, rh }
    change()
    text(REVERSE ? 'ellipsePolygon()' : 'polygonEllipse()', x, y)
}

function ellipseEllipse(x, y)
{
    function change()
    {
        let rw = Random.range(shape * 0.1, shape)
        let rh = Random.range(shape * 0.1, shape)
        ease.to(e1, { x: Random.range(x + rw, x + square - rw), y: Random.range(y + rh, y + square - rh), rw, rh }, TIME)
        rw = Random.range(shape * 0.1, shape)
        rh = Random.range(shape * 0.1, shape)
        const to = ease.to(e2, { x: Random.range(x + rw, x + square - rw), y: Random.range(y + rh, y + square - rh), rw, rh }, TIME)
        to.on('each', () =>
        {
            let tint = Intersects.ellipseEllipse(e1.x, e1.y, e1.rw, e1.rh, e2.x, e2.y, e2.rw, e2.rh) ? 0xff0000 : 0x00ff00
            g.clear()
                .beginFill(tint).drawEllipse(e1.x, e1.y, e1.rw, e1.rh).endFill()
                .beginFill(tint).drawEllipse(e2.x, e2.y, e2.rw, e2.rh).endFill()
        })
        to.on('done', change)
    }
    const g = renderer.stage.addChild(new PIXI.Graphics())
    let rw = Random.range(shape * 0.1, shape)
    let rh = Random.range(shape * 0.1, shape)
    const e1 = { x: Random.range(x + rw, x + square - rw), y: Random.range(y + rh, y + square - rh), rw, rh }
    rw = Random.range(shape * 0.1, shape)
    rh = Random.range(shape * 0.1, shape)
    const e2 = { x: Random.range(x + rw, x + square - rw), y: Random.range(y + rh, y + square - rh), rw, rh }
    change()
    text('ellipseEllipse()', x, y)
}

function circleOutlineBox(x, y)
{
    function change()
    {
        const r = Random.range(shape * 0.1, shape)
        const w = Random.range(shape * 0.1, shape)
        const h = Random.range(shape * 0.1, shape)
        ease.to(c, { x: Random.range(x + r, x + square - r), y: Random.range(y + r, y + square - r), r }, TIME)
        const to = ease.to(rectangle, { x: Random.range(x + w, x + square - w), y: Random.range(y + h, y + square - h), w, h }, TIME)
        to.on('each', () =>
        {
            const tint = (REVERSE ?
                Intersects.circleOutlineBox(c.x, c.y, c.r, r.x, r.y, r.w, r.h) :
                Intersects.boxCircleOutline(rectangle.x, rectangle.y, rectangle.w, rectangle.h, c.x, c.y, c.r)) ? 0xff0000 : 0x00ff00
            g.clear()
                .lineStyle(1, tint).drawCircle(c.x, c.y, c.r).lineStyle(0)
                .beginFill(tint).drawRect(rectangle.x, rectangle.y, rectangle.w, rectangle.h).endFill()
        })
        to.on('done', change)
    }
    const g = renderer.stage.addChild(new PIXI.Graphics())
    const c = { x: x + square / 2 - small / 2, y: y + square / 2 - small / 2, r: small }
    const w = Random.range(shape * 0.1, shape)
    const h = Random.range(shape * 0.1, shape)
    const rectangle = { x: Random.range(x + w, x + square - w), y: Random.range(y + h, y + square - h), w, h }

    change()
    text(REVERSE ? 'circleOutlineBox()' : 'boxCircleOutline()', x, y)
}

function circleOutlineLine(x, y)
{
    function change()
    {
        const to = ease.to(line, { x1: Random.range(x, x + square), y1: Random.range(y, y + square), x2: Random.range(x, x + square), y2: Random.range(y, y + square) }, TIME)
        to.on('each', () =>
        {
            const tint = (REVERSE ? Intersects.lineCircleOutline(line.x1, line.y1, line.x2, line.y2, circle.x, circle.y, circle.radius) :
                Intersects.circleOutlineLine(circle.x, circle.y, circle.radius, line.x1, line.y1, line.x2, line.y2)) ? 0xff0000 : 0x00ff00
            g.clear()
                .lineStyle(dot, tint).moveTo(line.x1, line.y1).lineTo(line.x2, line.y2)
                .lineStyle(1, tint).drawCircle(circle.x, circle.y, circle.radius).lineStyle(0)

        })
        to.on('done', change)
    }
    const g = renderer.stage.addChild(new PIXI.Graphics())
    const line = { x1: Random.range(x, x + square), y1: Random.range(y, y + square), x2: Random.range(x, x + square), y2: Random.range(y, y + square) }
    const circle = { x: x + square / 2, y: y + square / 2, radius: radius * 1.4 }
    change()
    text(REVERSE ? 'lineCircleOutline()' : 'circleOutlineLine()', x, y)
}

function circlePointOutline(x, y)
{
    function change()
    {
        const angle = Random.angle()
        const distance = Random.get(square * 0.4)
        const xTo = x + square / 2 + Math.cos(angle) * distance
        const yTo = y + square / 2 + Math.sin(angle) * distance
        const to = ease.target(point, { x: xTo, y: yTo }, speed)
        to.on('each', () =>
            circle.tint = (REVERSE ? Intersects.pointCircleOutline(point.x, point.y, circle.x, circle.y, radius, thickness) :
                Intersects.circleOutlinePoint(circle.x, circle.y, radius, point.x, point.y, thickness)) ? 0xff0000 : 0x00ff00)
        to.on('done', change)
    }
    const thickness = 5
    const circle = drawCircle(x + square / 2, y + square / 2, radius, 0xffffff, thickness)
    const point = drawCircle(x, y, dot, 0)
    change()
    text(REVERSE ? 'pointCircleOutline()' : 'circlePointOutline()', x, y)
}

// function circleOutlineCircle(x, y)
// {
//     function change()
//     {
//         const r = Random.range(shape * 0.1, shape)
//         ease.to(c1, { x: Random.range(x + r, x + square - r), y: Random.range(y + r, y + square - r), r }, TIME)
//         const angle = Random.angle()
//         const distance = Random.get(square * 0.4)
//         const xTo = x + square / 2 + Math.cos(angle) * distance
//         const yTo = y + square / 2 + Math.sin(angle) * distance
//         const to = ease.target(c2, { x: xTo, y: yTo }, speed)
//         to.on('each', () =>
//         {
//             const tint = (REVERSE ? Intersects.circleCircleOutline(c2.x, c2.y, small, c1.x, c1.y, c1.r) :
//                 Intersects.circleOutlineCircle(c1.x, c1.y, c1.r, c2.x, c2.y, small)) ? 0xff0000 : 0x00ff00
//             g.clear()
//                 .lineStyle(1, tint).drawCircle(c1.x, c1.y, c1.r).lineStyle(0)
//                 .beginFill(tint).drawCircle(c2.x, c2.y, small).endFill()
//         })
//         to.on('done', change)
//     }
//     const g = renderer.stage.addChild(new PIXI.Graphics())
//     const c1 = { x: x + square / 2, y: y + square / 2 }
//     const c2 = { x: x + Random.range(small, square - small), y: y + Random.range(small, square - small), r: Random.range(shape * 0.1, shape) }
//     change()
//     text(REVERSE ? 'circleOutlineCircle()' : 'outlineCircleCircle', x, y)
// }

// test for points on edge of polygon
// see https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html (point on edge)
function polygonPointSpecial(x, y)
{
    const xPos = x + square / 2 - shape / 2
    const yPos = y + square / 2 - shape / 2
    const points = [xPos + shape / 2, yPos, xPos, yPos + shape, xPos + shape, yPos + shape]
    const polygon = drawPolygon(points)
    const c = drawCircle(x, y, dot)
    c.tint = 0
    c.x = xPos + shape / 2
    c.y = yPos
    polygon.tint = Intersects.polygonPoint(points, c.x, c.y) ? 0xff0000 : 0x00ff00
    text('point on polygon edge (test)', x, y)
}

function text(text, x, y)
{
    const bg = renderer.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
    bg.tint = 0x888888
    const t = renderer.stage.addChild(new PIXI.Text(text, { fill: 'white', fontSize }))
    t.position.set(x + square / 2 - t.width / 2, y + square - t.height * 1.25)
    bg.position = t.position
    bg.width = t.width
    bg.height = t.height
}

function tests()
{
    function next()
    {
        x += square
        if (x + square > window.innerWidth)
        {
            x = edgeX
            y += square
        }
    }

    let edgeX = (window.innerWidth - Math.floor(window.innerWidth / square) * square) / 2
    let x = edgeX
    let y = (window.innerHeight - Math.floor(window.innerHeight / square) * square) / 2
    circlePoint(x, y)
    next()
    circleCircle(x, y)
    next()
    circleLine(x, y)
    next()
    circleBox(x, y)
    next()
    circlePolygon(x, y)
    next()
    boxPoint(x, y)
    next()
    boxBox(x, y)
    next()
    polygonPolygon(x, y)
    next()
    polygonBox(x, y)
    next()
    polygonPoint(x, y)
    next()
    lineLine(x, y)
    next()
    lineLineThickness(x, y)
    next()
    lineBox(x, y)
    next()
    linePoint(x, y)
    next()
    ellipsePoint(x, y)
    next()
    ellipseLine(x, y)
    next()
    ellipseBox(x, y)
    next()
    ellipseCircle(x, y)
    next()
    ellipsePolygon(x, y)
    next()
    ellipseEllipse(x, y)
    next()
    circleOutlineBox(x, y)
    next()
    circleOutlineLine(x, y)
    next()
    circlePointOutline(x, y)
    next()
    // circleOutlineCircle(x, y)
    // next()
    polygonPointSpecial(x, y)
}

// sets up renderer, pixi-ease
function setup()
{
    renderer = new PIXI.Application({ transparent: true, resolution: window.devicePixelRatio, view: document.querySelector('.view') })
    document.body.appendChild(renderer.view)
    ease = new Ease.list()
}

// determines test box size
// from https://math.stackexchange.com/a/466248
function resize()
{
    let x = window.innerWidth
    let y = window.innerHeight
    let n = TESTS
    let px = Math.ceil(Math.sqrt(n * x / y))
    let sx, sy
    if (Math.floor(px * y / x) * px < TESTS)  // does not fit, y/(x/px)=px*y/x
    {
        sx = y / Math.ceil(px * y / x)
    }
    else
    {
        sx = x / px
    }
    let py = Math.ceil(Math.sqrt(n * y / x))
    if (Math.floor(py * x / y) * py < n)  // does not fit
    {
        sy = x / Math.ceil(x * py / y)
    }
    else
    {
        sy = y / py
    }
    square = Math.max(sx, sy)
    shape = square * 0.3
    radius = shape / 2
    small = square * 0.1
    dot = square * 0.01
    speed = square * 0.00075

    fontSize = calcFontSize('this should fit', { width: square * 0.4 })

    renderer.stage.removeChildren()
    tests()
    renderer.renderer.resize(x, y + square)
}

function drawCircle(x, y, r, color, outline)
{
    color = typeof color === 'undefined' ? 0xffffff : color
    const circle = renderer.stage.addChild(new PIXI.Graphics())
    if (outline)
    {
        circle.lineStyle(outline === true ? 1 : outline, color).drawCircle(0, 0, r).lineStyle(0)
    }
    else
    {
        circle.beginFill(color).drawCircle(0, 0, r).endFill()
    }
    circle.position.set(x, y)
    return circle
}

function drawBox(b, color)
{
    color = typeof color === 'undefined' ? 0xffffff : color
    const box = renderer.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
    box.tint = color
    box.width = b.w
    box.height = b.h
    box.position.set(b.x, b.y)
    return box
}

function drawPolygon(points, color)
{
    color = typeof color === 'undefined' ? 0xffffff : color
    const polygon = renderer.stage.addChild(new PIXI.Graphics())
    polygon.beginFill(color).drawPolygon(points).endFill()
    return polygon
}

// shows the code in the demo
window.onload = function()
{
    setup()
    resize()
    window.addEventListener('resize', resize)
}

// for eslint
/* globals window, document */
