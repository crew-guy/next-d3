import React, {useState, useContext, useEffect } from 'react'
import useWorldAtlas from '@hooks/useWorldAtlas'
import useCities from '@hooks/useCities'
import { scaleSqrt } from 'd3-scale'
import { max } from 'd3-array'

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
        const { countries, interiors } = await useWorldAtlas()
        const cities = await useCities() 
        await setData({ countries, interiors, cities })
        await setHeight(window.innerHeight)
        await setWidth(window.innerWidth)
    },[])

    config.data = data
    config.height = height
    config.width = width
    config.margin = {
        top:30,
        bottom:30,
        left:80,
        right:80,
    }
    config.innerHeight = height - config.margin.top - config.margin.bottom
    config.innerWidth = height - config.margin.left - config.margin.right
    
    // Using size to depict population
    config.maxRadius = 20
    config.sizeValue = d => d.population
    config.sizeScale = scaleSqrt()
        .domain([0, max(data.cities, config.sizeValue)])
        .range([0, config.maxRadius])

    return (
        <ConfigContext.Provider value={config} >
            {children}
        </ConfigContext.Provider>
    )
}

export default ConfigProvider
