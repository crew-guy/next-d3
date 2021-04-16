import React, { useState, useEffect, useContext } from 'react'
// import fetchData from '@helpers/fetchData'
import {scaleLinear, max, extent} from 'd3'
import {useData} from '@hooks/useData'

const ConfigContext = React.createContext()

export const useConfig = () => useContext(ConfigContext)

const ConfigProvider = ({ children }) =>
{
    const config = {}
    const [data, setData] = useState([])
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [xScale, setXScale] = useState()
    const [yScale, setYScale] = useState()

    useEffect( () =>
    {
        (async () => {
            const temp = await useData()
            setData(temp)
        })()
        console.log(data)
        setHeight(window.innerHeight)
        setWidth(window.innerWidth)
        setXScale(
        )
    }, [])


    config.margin = {
        top: 60,
        left: 100,
        bottom: 120,
        right: 90,
    }

    console.log(data)
    config.height = height
    config.width = width
    config.xScale = scaleLinear()
        // .domain(extent(data, config.xVal))
        .domain([0,max(data,config.xVal)])
        .range([0, config.innerWidth])
        .nice()
    config.yScale = scaleLinear()
        // .domain(extent(data, config.yVal))
        .domain([0,max(data,config.yVal)])
        .range([0, config.innerHeight])

    config.innerWidth = width - config.margin.left - config.margin.right
    config.innerHeight = height - config.margin.top - config.margin.bottom

    // const attributes = [
    //     {
    //         value:'sepal_length',
    //         label: 'Sepal  Length'
    //     },
    //     {
    //         value:'sepal_width',
    //         label: 'Sepal  Width'
    //     },
    //     {
    //         value:'petal_length',
    //         label: 'Petal  Length'
    //     },
    //     {
    //         value:'petal_width',
    //         label: 'Petal width'
    //     },
    //     {
    //         value:'species',
    //         label: 'Species'
    //     }
    // ]

    // TODO : Integrate these with the attributes and trigger changes in them via the dropdown menu
    // config.xVal = d => d[xAttribute] where xAttribute is controlled by useState and dropdown
    config.xVal = d => d.petal_length
    config.yVal = d=> d.sepal_width
    
    config.tooltipFormat = d => d
    config.xAxisTickFormat = d => d
    config.yAxisTickFormat = d => d
    // LABELS

    // TODO : Get the label values from the attributes list that you will set
    config.xAxisLabel = "Petal Length"
    config.yAxisLabel = "Petal Width"
    config.xAxisLabelOffset = 70
    config.yAxisLabelOffset = 40
    
    return (
        <ConfigContext.Provider value={config} >
            {children}
        </ConfigContext.Provider>
    )
}

export default ConfigProvider
