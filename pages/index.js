import Head from 'next/head'
import { useEffect, useState } from 'react'
import fetchData from '../src/helpers/fetchData'
import * as d3 from 'd3'
import {AxisBottom} from '../src/components/AxisBottom'
import {AxisLeft} from '../src/components/AxisLeft'
import {Marks} from '../src/components/Marks'
// import {xAxisLabel} from '../src/components/xAxisLabel'

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
    bottom: 120,
    right: 90,
  }
  
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const xVal = d => d.petal_length
  const yVal = d=> d.sepal_width

  const xScale = d3.scaleLinear()
    // .domain(d3.extent(data, xVal))
    .domain([0,d3.max(data,xVal)])
    .range([0, innerWidth])
    .nice()
  
  const yScale = d3.scaleLinear()
    // .domain(d3.extent(data, yVal))
    .domain([0,d3.max(data,yVal)])
    .range([0, innerHeight])
  
  
  const tooltipFormat = d => d
  const xAxisTickFormat = d => d
  const yAxisTickFormat = d => d


  // LABELS
  const xAxisLabel = "Petal Length"
  const yAxisLabel = "Petal Width"
  const xAxisLabelOffset = 70
  const yAxisLabelOffset = 40

  return (
    <svg width={width} height={height}>
      <g width={innerWidth} height={innerHeight} transform={`translate(${margin.left},${margin.top})`} >
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={17}
        />
        <AxisLeft
          innerHeight={innerHeight}
          yScale={yScale}
          innerWidth={innerWidth}
          tickFormat={yAxisTickFormat}
          tickOffset={5}
        />
        <Marks
          tooltipFormat={tooltipFormat}
          xScale={xScale}
          data={data}
          xVal={xVal}
          yVal={yVal}
          yScale={yScale}
          circleRadius={12}
        />
      <text
      x={innerWidth / 2}
      y={innerHeight + xAxisLabelOffset}
      textAnchor='middle'
      style={{ fontSize: '2.2rem' }}
      className='labels'
      >
      {xAxisLabel}
        </text>
        <text
            textAnchor='middle'
            style={{ fontSize: '2.2rem' }}
            transform={`
              translate(
                ${-yAxisLabelOffset}, 
                ${innerHeight/2}
                ),
              rotate(-90)` 
            }
            className='labels'
        >
            {yAxisLabel}
        </text>
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