import {circlePoint} from './circle-point';

export function circleOutlineCircle(xc, yc, rc, xco, yco, rco, thickness)
{
    if (circlePoint(xc, yc, rc, xco, yco))
    {
        return true
    }

}

export function circleCircleOutline(xco, yco, rco, xc, yc, rc)
{
    return circleOutlineCircle(xc, yc, rc, xco, yco, rco)
}