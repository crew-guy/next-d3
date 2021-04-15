import {scaleLinear, extent} from 'd3'

export function plotConfig(data,height, width)
{
    const config = {}
    
    config.margin = {
        top: 40,
        left: 40,
        right: 40,
        bottom:40
    }

    // DIMENSIONS OF PLOT EXCLUDING MARGIN
    config.innerHeight = height-config.margin.top-config.margin.bottom
    config.innerWidth = width - config.margin.left - config.margin.right
    
    // INDIVIDUAL ITEM HANDLING
    config.xVal = d => d.temperature
    config.yVal = d => d.timestamp

    // SCALES
    config.xScale = scaleLinear()
        .domain(extent(data,config.xVal))
        .range([0, config.innerWidth])
    
    // 
    config.yScale = scaleLinear()
        .domain(extent(data,config.yVal))
        .range([config.innerHeight, 0])
    
    config.xAxisLabel = 'Time'
    config.yAxisLabel = 'Temperature'
    config.xAxisLabelOffset = 44
    config.yAxisLabelOffset = 44

    config.xAxisTickFormat = d => d
    config.yAxisTickFormat = d => d
    config.tooltipFormat = d => d

    return config
    
    
}