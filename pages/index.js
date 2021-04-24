import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {fetchData} from '@helpers/fetchData'
import { useState, useEffect } from 'react'
import { plotConfig } from '@helpers/config'
import {bin, scaleLinear, max, timeMonths, sum} from 'd3'

// Importing the components 
import AxisLeft from '@components/AxisLeft'
import AxisBottom from '@components/AxisBottom'
import Marks from '@components/Marks'
import XAxisLabel from '@components/XAxisLabel'
import YAxisLabel from '@components/YAxisLabel'

// export default function Home({data}) {
export default function Home() {
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const [data, setData] = useState([])  
  
  // Fetching the browser's height and the width from the window object 
  useEffect(() =>
  {
    (async () =>
    {
      const buffer = await fetchData()
      setData(buffer)
    })()
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
    // yScale,
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

  const [start, stop] = xScale.domain()
  
  const binnedData = bin()
    .value(xVal)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
  
  const summedBinnedData = binnedData.map(array => ({
    y: sum(array, yVal),
    x0: array.x0,
    x1:array.x1
  }))

  console.log(bin()
  .value(xVal)
  .domain(xScale.domain())
  .thresholds(timeMonths(start, stop))
  (data))
  
  // Gotta redefine yScale based on sums calculated in binnedData
  const yScale = scaleLinear()
    .domain([0, max(summedBinnedData, d => d.y)])
    .range([innerHeight,0])
  
  
  console.log(binnedData)
  
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
          binnedData={summedBinnedData}
          xScale={xScale}
          yScale={yScale}
          radiusCircle={radiusCircle}
          innerHeight={innerHeight}
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

// export const getStaticProps = async () =>
// {
//   const data = await fetchData()
//   return {
//     props:{data}
//   }
// }