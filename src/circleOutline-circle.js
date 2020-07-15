var circlePoint = require('./circle-point')

module.exports = function circleOutlineCircle(xc, yc, rc, xco, yco, rco, thickness)
{
    if (circlePoint(xc, yc, rc, xco, yco))
    {
        return true
    }

}