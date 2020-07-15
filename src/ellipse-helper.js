// from http://yehar.com/blog/?p=2926

var MAX_ITERATIONS = 10
var innerPolygonCoef, outerPolygonCoef, initialized

function initialize()
{
    innerPolygonCoef = []
    outerPolygonCoef = []
    for (var t = 0; t <= MAX_ITERATIONS; t++)
    {
        var numNodes = 4 << t
        innerPolygonCoef[t] = 0.5 / Math.cos(4 * Math.acos(0) / numNodes)
        outerPolygonCoef[t] = 0.5 / (Math.cos(2 * Math.acos(0) / numNodes) * Math.cos(2 * Math.acos(0) / numNodes))
    }
    initialized = true
}

function iterate(x, y, c0x, c0y, c2x, c2y, rr)
{
    for (var t = 1; t <= MAX_ITERATIONS; t++)
    {
        var c1x = (c0x + c2x) * innerPolygonCoef[t]
        var c1y = (c0y + c2y) * innerPolygonCoef[t]
        var tx = x - c1x
        var ty = y - c1y
        if (tx * tx + ty * ty <= rr)
        {
            return true
        }
        var t2x = c2x - c1x
        var t2y = c2y - c1y
        if (tx * t2x + ty * t2y >= 0 && tx * t2x + ty * t2y <= t2x * t2x + t2y * t2y &&
            (ty * t2x - tx * t2y >= 0 || rr * (t2x * t2x + t2y * t2y) >= (ty * t2x - tx * t2y) * (ty * t2x - tx * t2y)))
        {
            return true
        }
        var t0x = c0x - c1x
        var t0y = c0y - c1y
        if (tx * t0x + ty * t0y >= 0 && tx * t0x + ty * t0y <= t0x * t0x + t0y * t0y &&
            (ty * t0x - tx * t0y <= 0 || rr * (t0x * t0x + t0y * t0y) >= (ty * t0x - tx * t0y) * (ty * t0x - tx * t0y)))
        {
            return true
        }
        var c3x = (c0x + c1x) * outerPolygonCoef[t]
        var c3y = (c0y + c1y) * outerPolygonCoef[t]
        if ((c3x - x) * (c3x - x) + (c3y - y) * (c3y - y) < rr)
        {
            c2x = c1x
            c2y = c1y
            continue
        }
        var c4x = c1x - c3x + c1x
        var c4y = c1y - c3y + c1y
        if ((c4x - x) * (c4x - x) + (c4y - y) * (c4y - y) < rr)
        {
            c0x = c1x
            c0y = c1y
            continue
        }
        var t3x = c3x - c1x
        var t3y = c3y - c1y
        if (ty * t3x - tx * t3y <= 0 || rr * (t3x * t3x + t3y * t3y) > (ty * t3x - tx * t3y) * (ty * t3x - tx * t3y))
        {
            if (tx * t3x + ty * t3y > 0)
            {
                if (Math.abs(tx * t3x + ty * t3y) <= t3x * t3x + t3y * t3y || (x - c3x) * (c0x - c3x) + (y - c3y) * (c0y - c3y) >= 0)
                {
                    c2x = c1x
                    c2y = c1y
                    continue
                }
            } else if (-(tx * t3x + ty * t3y) <= t3x * t3x + t3y * t3y || (x - c4x) * (c2x - c4x) + (y - c4y) * (c2y - c4y) >= 0)
            {
                c0x = c1x
                c0y = c1y
                continue
            }
        }
        return false
    }
    return false // Out of iterations so it is unsure if there was a collision. But have to return something.
}

// Test for collision between an ellipse of horizontal radius w0 and vertical radius h0 at (x0, y0) and
// an ellipse of horizontal radius w1 and vertical radius h1 at (x1, y1)
function ellipseEllipse(x0, y0, w0, h0, x1, y1, w1, h1)
{
    if (!initialized)
    {
        initialize()
    }

    var x = Math.abs(x1 - x0) * h1
    var y = Math.abs(y1 - y0) * w1
    w0 *= h1
    h0 *= w1
    var r = w1 * h1

    if (x * x + (h0 - y) * (h0 - y) <= r * r || (w0 - x) * (w0 - x) + y * y <= r * r || x * h0 + y * w0 <= w0 * h0
        || ((x * h0 + y * w0 - w0 * h0) * (x * h0 + y * w0 - w0 * h0) <= r * r * (w0 * w0 + h0 * h0) && x * w0 - y * h0 >= -h0 * h0 && x * w0 - y * h0 <= w0 * w0))
    {
        return true
    }
    else
    {
        if ((x - w0) * (x - w0) + (y - h0) * (y - h0) <= r * r || (x <= w0 && y - r <= h0) || (y <= h0 && x - r <= w0))
        {
            return iterate(x, y, w0, 0, 0, h0, r * r)
        }
        return false
    }
}

// Test for collision between an ellipse of horizontal radius w and vertical radius h at (x0, y0) and
// a circle of radius r at (x1, y1)
function ellipseCircle(x0, y0, w, h, x1, y1, r)
{
    if (!initialized)
    {
        initialize()
    }
    var x = Math.abs(x1 - x0)
    var y = Math.abs(y1 - y0)

    if (x * x + (h - y) * (h - y) <= r * r || (w - x) * (w - x) + y * y <= r * r || x * h + y * w <= w * h
        || ((x * h + y * w - w * h) * (x * h + y * w - w * h) <= r * r * (w * w + h * h) && x * w - y * h >= -h * h && x * w - y * h <= w * w))
    {
        return true
    }
    else
    {
        if ((x - w) * (x - w) + (y - h) * (y - h) <= r * r || (x <= w && y - r <= h) || (y <= h && x - r <= w))
        {
            return iterate(x, y, w, 0, 0, h, r * r)
        }
        return false
    }
}

module.exports = {
    ellipseCircle: ellipseCircle,
    ellipseEllipse: ellipseEllipse
}