
import React, { useState, useEffect, useContext } from 'react'
// import fetchData from '@helpers/fetchData'
import {scaleLinear, max, extent, scaleOrdinal} from 'd3'
import {useData} from '@hooks/useData'
import { attributes } from '@helpers/attributes'
import
    {
        MARGIN,
        X_AXIS_LABEL_OFFSET,
        Y_AXIS_LABEL_OFFSET,
        RADIUS_CIRCLE,
        X_AXIS_TICK_OFFSET,
        Y_AXIS_TICK_OFFSET,
        COLOR_ARRAY,
        TICK_TEXT_OFFSET,
        TICK_SPACING,
        LEGEND_X_OFFSET,
        LEGEND_Y_OFFSET,
        FADE_OPACITY
    } from '@helpers/configValues'


    
const ConfigContext = React.createContext()

export const useConfig = () => useContext(ConfigContext)

const ConfigProvider = ({ children }) =>
{
    const config = {}
    const [data, setData] = useState([])
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)

    //* FOR HOVER INTERACTIVITY OF MARKS
    const [hoveredValue, setHoveredValue] = useState(null)
    config.hoveredValue = hoveredValue
    config.setHoveredValue = setHoveredValue

    useEffect( () =>
    {
        (async () => {
            const temp = await useData()
            setData(temp)
            setHeight(window.innerHeight)
            setWidth(window.innerWidth)
        })()
        // console.log(data)
    }, [])


    config.margin = MARGIN

    // console.log(data)
    config.data = data
    // console.log(config.data)

    //* ATTRIBUTES
    const currentX = attributes[0]
    const currentY = attributes[1]

    config.currentX = currentX
    config.currentY = currentY

    const [xAttribute, setXAttribute] = useState(currentX)
    const [yAttribute, setYAttribute] = useState(currentY)
    
    config.setXAttribute = setXAttribute
    config.setYAttribute = setYAttribute

    config.attributes = attributes

    config.xVal = d => d[xAttribute.value]
    config.yVal = d => d[yAttribute.value]
    config.colorVal = d => d.species

    //* FOR DATA INTERACTIVITY ON HOVER
    config.filteredData = data.filter(d => hoveredValue === config.colorVal(d))

    // console.log(config.xVal)

    //* HEIGHTS AND WIDTHS
    config.height = height
    config.width = width
    config.innerWidth = width - config.margin.left - config.margin.right
    config.innerHeight = height - config.margin.top - config.margin.bottom

    
    //* SCALES
    config.xScale = scaleLinear()
        // .domain(extent(data, config.xVal))
        .domain(extent(data,config.xVal))
        .range([0,config.innerWidth])
        .nice()

    config.yScale = scaleLinear()
        // .domain(extent(data, config.yVal))
        .domain([0,max(data,config.yVal)])
        .range([config.innerHeight, 0])
    
    config.colorScale = scaleOrdinal()
        .domain(data.map(config.colorVal))
        .range(COLOR_ARRAY)

    //* TICKS AND TOOLTIPS
    config.xAxisTickOffset = X_AXIS_TICK_OFFSET
    config.yAxisTickOffset = Y_AXIS_TICK_OFFSET
    config.tooltipFormat = d => d
    config.xAxisTickFormat = d => d
    config.yAxisTickFormat = d => d

    //* LABELS
    config.xAxisLabel = xAttribute.label
    config.yAxisLabel = yAttribute.label
    config.xAxisLabelOffset = X_AXIS_LABEL_OFFSET
    config.yAxisLabelOffset = Y_AXIS_LABEL_OFFSET

    //* MARKS
    config.radiusCircle = RADIUS_CIRCLE

    //* LEGEND
    config.legendXOffset = LEGEND_X_OFFSET
    config.legendYOffset = LEGEND_Y_OFFSET
    config.tickSpacing = TICK_SPACING
    config.tickTextOffset = TICK_TEXT_OFFSET

    //* INTERACTIVITY
    config.fadeOpacity = FADE_OPACITY
    

    return (
        <ConfigContext.Provider value={config} >
            {children}
        </ConfigContext.Provider>
    )
}

export default ConfigProvider
