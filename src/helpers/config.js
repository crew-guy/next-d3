import {scaleLinear, extent, format, timeFormat} from 'd3'

export function plotConfig(data,innerHeight,innerWidth)
{
    const config = {}

    // INDIVIDUAL ITEM HANDLING
    config.xVal = d => new Date(d.timestamp)
    config.yVal = d => d.temperature

    // SCALES
    config.xScale = scaleLinear()
        .domain(extent(data,config.xVal))
        .range([0, innerWidth])
        .nice()
    
    config.yScale = scaleLinear()
        .domain(extent(data,config.yVal))
        .range([innerHeight, 0])
        .nice()
    
    // LABELS
    config.xAxisLabel = 'Time'
    config.yAxisLabel = 'Temperature'
    config.xAxisLabelOffset = 60
    config.yAxisLabelOffset = 60

    // TICKS
    config.xAxisTickFormat = d =>  timeFormat("%a")(new Date(d)),
    config.yAxisTickFormat = d => d
    config.xAxisTickOffset = 14
    config.yAxisTickOffset = 14
    config.tooltipFormat = d => format('.5s')(d)

    // MARKS
    config.radiusCircle = 8

    return config
    
    
}