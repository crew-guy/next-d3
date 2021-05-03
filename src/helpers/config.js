import {scaleLinear, extent, format, timeFormat} from 'd3'

export function plotConfig(data,innerHeight,innerWidth)
{
    const config = {}

    // INDIVIDUAL ITEM HANDLING
    config.xVal = d => new Date(d['Reported Date'])
    config.yVal = d => d['Total Dead and Missing']

    console.log(data)
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
    config.xAxisLabel = 'Reported Date'
    config.yAxisLabel = 'Total Dead and Missing'
    config.xAxisLabelOffset = 60
    config.yAxisLabelOffset = 60

    // TICKS
    config.xAxisTickFormat = d =>  timeFormat("%j")(new Date(d)),
    config.yAxisTickFormat = d => d
    config.xAxisTickOffset = 14
    config.yAxisTickOffset = 14
    config.tooltipFormat = d => format('.5s')(d)

    // MARKS
    config.radiusCircle = 8

    return config
    
    
}