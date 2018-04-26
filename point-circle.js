'use strict'

var circlePoint = require('./circle-point')

module.exports = function pointCircle(x1, y1, xc, yc, rc)
{
    return circlePoint(xc, yc, rc, x1, y1)
}
