import React, {useState, useContext, useEffect } from 'react'
import useWorldAtlas from '@hooks/useWorldAtlas'
import useInfo from '@hooks/useInfo'
import
    {
        scaleSqrt,
        scaleLinear,
        max,
        timeMonths,
        sum,
        extent,
        bin,
        timeFormat,
        format
    } from 'd3'

const ConfigContext = React.createContext()

export const useConfig = () =>
{
    return useContext(ConfigContext)
}

const ConfigProvider = ({children}) =>
{
    const config = {}
    const [data, setData] = useState()
    const [height, setHeight] = useState()
    const [width, setWidth] = useState()

    useEffect(async () =>
    {
        (async () =>
        {
            const { countries, interiors } = await useWorldAtlas()
            const info = await useInfo() 
            const temp = { countries, interiors, info }
            // console.log(temp)
            setData(temp)
        })()
        await setHeight(window.innerHeight)
        await setWidth(window.innerWidth)
    },[])


    //! GENERAL SETUP

    config.data = data
    // console.log(data)
    config.height = height
    config.width = width
    config.margin = {
        top:30,
        bottom:30,
        left:80,
        right:80,
    }
    config.innerHeight = height - config.margin.top - config.margin.bottom
    config.innerWidth = width - config.margin.left - config.margin.right
    config.bubbleMapHeight = config.innerHeight * 0.6
    config.dateHistogramHeight = config.innerHeight*0.3
    config.bubbleMapWidth = config.innerWidth
    config.dateHistogramWidth = config.innerWidth
    
    //! BUBBLE MAP
    
    // Using size to depict population
    config.maxRadius = 20
    config.sizeValue = d => d['Total Dead and Missing']
    if (data)
    {
        config.sizeScale = scaleSqrt()
            .domain([0, max(config.data.info, config.sizeValue)])
            .range([0, config.maxRadius])
    }
    

    //! DATE HISTOGRAM

    // INDIVIDUAL ITEM HANDLING
    config.xVal = d => new Date(d['Reported Date'])
    config.yVal = d => d['Total Dead and Missing']
    
    // SCALES
    if (config.data)
    {
        config.xScale = scaleLinear()
            .domain(extent(config.data.info,config.xVal))
            .range([0, config.dateHistogramWidth])
            .nice()
        
        // console.log(config.xScale)

        // BINS
        const [start, stop] = config.xScale.domain()

        const binnedData = bin()
            .value(config.xVal)
            .domain(config.xScale.domain())
            .thresholds(timeMonths(start, stop))(config.data.info)
        
        config.summedBinnedData = binnedData.map(array => ({
            y: sum(array, config.yVal),
            x0: array.x0,
            x1:array.x1
        }))


        // Gotta redefine yScale based on sums calculated in binnedData
        config.yScale = scaleLinear()
            .domain([0, max(config.summedBinnedData, d => d.y)])
            .range([config.dateHistogramHeight, 0])
    }
    
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

    return (
        <ConfigContext.Provider value={config} >
            {children}
        </ConfigContext.Provider>
    )
}

export default ConfigProvider
