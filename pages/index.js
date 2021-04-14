import Head from 'next/head'
import { useEffect, useState } from 'react'
import fetchData from '@helpers/fetchConfig'
import * as d3 from 'd3'
import AxisBottom from '@components/AxisBottom'
import AxisLeft from '@components/AxisLeft'
import Marks from '@components/Marks'

const Home = ({data}) =>
{
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  useEffect(() =>
  {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  }, [])

  const margin = {
    top: 30,
    left: 30,
    bottom: 30,
    right: 30,
  }
  
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const xVal = data.sepal_length
  const yVal = data.sepal_width

  const xScale = d3.scaleLinear()
    .domain(extend(data, xVal))
    .range([0, innerWidth])
  
  const yScale = d3.scaleLinear()
    .domain(extend(data, xVal))
    .range([0, innerHeight])
  
  
  const tooltipFormat = d => d

  return (
    <svg>
      <AxisBottom/>
      <AxisLeft/>
      <Marks/>
    </svg>
  )
}



export const getStaticProps = () =>
{
  const data = await fetchData()
  return {
    props:{data}
  }
}