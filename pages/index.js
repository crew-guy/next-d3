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
  const [config, setConfig] = useState({})  
  
  // Fetching the browser's height and the width from the window object 
  useEffect(() =>
  {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
    setConfig(plotConfig(data, height, width))
  },[])
  const {
    margin,
    innerHeight,
    innerWidth,
    xVal,
    yVal,
    xScale,
    yScale,
    xAxisLabel,
    yAxisLabel,
    xAxisLabelOffset,
    yAxisLabelOffset,
    xAxisTickFormat,
    yAxisTickFormat
  } = config
  // console.log({margin})

  // const margin = {
  //   top: 40,
  //   left:40
  // }

  console.log({data})

  return (
    <svg height = {height} width = {width} >
      <g
        height={innerHeight}
        width={innerWidth}
        transform={`translate(${margin ? margin.top : 40},${margin ? margin.left : 40})`}
      >
        <AxisLeft />
        <AxisBottom />
        <Marks />
        <XAxisLabel />
        <YAxisLabel/>
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