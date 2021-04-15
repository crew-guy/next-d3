import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {fetchData} from '@helpers/fetchData'
import { useState, useEffect } from 'react'
import { plotConfig } from '@helpers/config'

// Importing the components 
import AxisLeft from '@components/AxisLeft'
import AxisBottom from '@components/AxisBottom'
import Marks from '@components/Marks'
import XAxisLabel from '@components/XAxisLabel'
import YAxisLabel from '@components/YAxisLabel'

export default function Home({data}) {
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  // const [config, setConfig] = useState({})  
  
  // Fetching the browser's height and the width from the window object 
  useEffect(() =>
  {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
    // setConfig(plotConfig(data, height, width))
  }, [])
  
  const margin = {
    top: 60,
    left: 140,
    right: 80,
    bottom:100
  }
  
  // DIMENSIONS OF PLOT EXCLUDING MARGIN
  const innerHeight = height-margin.top-margin.bottom
  const innerWidth = width - margin.left - margin.right

  const config = plotConfig(data,innerHeight, innerWidth)

  const {
    xVal,
    yVal,
    xScale,
    yScale,
    xAxisLabel,
    yAxisLabel,
    xAxisLabelOffset,
    yAxisLabelOffset,
    xAxisTickOffset,
    yAxisTickOffset,
    xAxisTickFormat,
    yAxisTickFormat,
    tooltipFormat,
    radiusCircle
  } = config
  // console.log({data})

  return (
      <svg height={height} width={width} >
      <g
        height={innerHeight}
        width={innerWidth}
        transform={`translate(${margin.left},${margin.top})`}
      >
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          xAxisTickOffset={xAxisTickOffset}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft
          yScale={yScale}
          yAxisTickOffset={yAxisTickOffset}
          innerWidth={innerWidth}
          tickFormat={yAxisTickFormat}
        />
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xVal={xVal}
          yVal={yVal}
          radiusCircle={radiusCircle}
          tooltipFormat={tooltipFormat}
        />
        <XAxisLabel
          innerHeight={innerHeight}
          innerWidth={innerWidth}
          xAxisLabelOffset={xAxisLabelOffset}
          xAxisLabel={xAxisLabel}
        />
        <YAxisLabel
          innerHeight={innerHeight}
          yAxisLabelOffset={yAxisLabelOffset}
          yAxisLabel={yAxisLabel}
        />
      </g>
    </svg>
  )
}

export const getStaticProps = async () =>
{
  const data = await fetchData()
  return {
    props:{data}
  }
}