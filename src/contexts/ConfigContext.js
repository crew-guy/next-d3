import React, { useState, useEffect, useContext } from 'react'
// import fetchData from '@helpers/fetchData'
import {scaleLinear, max, extent} from 'd3'
import {useData} from '@hooks/useData'
import {attributes} from '@helpers/attributes'

const ConfigContext = React.createContext()

export const useConfig = () => useContext(ConfigContext)

const ConfigProvider = ({ children }) =>
{
    const config = {}
    const [data, setData] = useState([])
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)

    useEffect( () =>
    {
        (async () => {
            const temp = await useData()
            setData(temp)
        })()
        // console.log(data)
        setHeight(window.innerHeight)
        setWidth(window.innerWidth)
    }, [])


    config.margin = {
        top: 60,
        left: 100,
        bottom: 120,
        right: 90,
    }

    // console.log(data)

    // HEIGHTS AND WIDTHS
    config.height = height
    config.width = width
    config.innerWidth = width - config.margin.left - config.margin.right
    config.innerHeight = height - config.margin.top - config.margin.bottom

    
    // SCALES
    config.xScale = scaleLinear()
        // .domain(extent(data, config.xVal))
        .domain([0,max(data,config.xVal)])
        .range([0, config.innerWidth])
        .nice()
    
    config.yScale = scaleLinear()
        // .domain(extent(data, config.yVal))
        .domain([0,max(data,config.yVal)])
        .range([0, config.innerHeight])

    

    // ATTRIBUTES
    const currentX = attributes[0]
    const currentY = attributes[1]

    const [xAttribute, setXAttribute] = useState(currentX.value)
    const [yAttribute, setYAttribute] = useState(currentY.value)

    config.xVal = d => d[xAttribute]
    config.yVal = d=> d[yAttribute]
    
    config.setXAttribute = setXAttribute
    config.setYAttribute = setYAttribute

    // TICKS AND TOOLTIPS
    config.xAxisTickOffset = 8
    config.yAxisTickOffset = -8
    config.tooltipFormat = d => d
    config.xAxisTickFormat = d => d
    config.yAxisTickFormat = d => d

    // LABELS

    // TODO : Get the label values from the attributes list that you will set
    config.xAxisLabel = currentX.label
    config.yAxisLabel = currentY.label
    config.xAxisLabelOffset = 70
    config.yAxisLabelOffset = 40
    
    return (
        <ConfigContext.Provider value={config} >
            {children}
        </ConfigContext.Provider>
    )
}

export default ConfigProvider