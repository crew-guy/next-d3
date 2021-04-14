import Head from 'next/head'
import { useEffect, useState } from 'react'
import fetchData from '../src/helpers/fetchData'
import * as d3 from 'd3'
import {AxisBottom} from '../src/components/AxisBottom'
import {AxisLeft} from '../src/components/AxisLeft'
import {Marks} from '../src/components/Marks'

const Home = ({data}) =>
{
  // console.log(data)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  useEffect(() =>
  {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  }, [])

  const margin = {
    top: 60,
    left: 100,
    bottom: 60,
    right: 90,
  }
  
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const xVal = d => d.sepal_length
  const yVal = d=> d.sepal_width

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xVal))
    .range([0, innerWidth])
  
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yVal))
    .range([0, innerHeight])
  
  
  const tooltipFormat = d => d
  const xAxisTickFormat = d => d
  const yAxisTickFormat = d => d

  return (
    <svg width={width} height={height}>
      <g width={innerWidth} height={innerHeight} transform={`translate(${margin.left},${margin.top})`} >
        <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat} />
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickFormat={yAxisTickFormat} />
        <Marks xScale={xScale} yScale={yScale} />
      </g>
    </svg>
  )
}

export default Home


export const getStaticProps = async () =>
{
  const data = await fetchData()
  return {
    props:{data}
  }
}