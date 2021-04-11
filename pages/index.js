import Head from 'next/head'
import styles from '../styles/Home.module.css'
import * as d3 from 'd3'
import {useState, useEffect} from 'react'
import {scaleLinear, scaleBand, max, format} from 'd3'
import {AxisTop} from '@components/AxisTop'
import {AxisBottom} from '@components/AxisBottom'
import {Marks} from '@components/Marks'
import {fetchData} from '@helpers/fetchData'

export default function Home({data}) {
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  useEffect(()=>{
    setHeight(window.innerHeight-100)
    setWidth(window.innerWidth-100)
  },[])

  const margin = {top:40, left:300, right:40, bottom:100}
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const xVal = d => d.Population
  const yVal = d => d.Country

  const yScale = scaleBand()
      .domain(data.map(yVal))
      .range([0,innerHeight])
      .padding(0.2)

  const xScale = scaleLinear()
      .domain([0, max(data,xVal)])
      .range([0, innerWidth])
  
  
  const xAxisLabelOffset = 80
  const siFormat = format(".2s");
  const tickFormat = tickFormat => siFormat(tickFormat).replace('G','B')
  

  return (
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left},${margin.top})`} >
            <AxisTop xScale={xScale} innerHeight={innerHeight} tickFormat={tickFormat} />
            <AxisBottom yScale={yScale}/>
            <text
              className="axis-label"
              x={innerWidth / 2}
              textAnchor='center'
              y={innerHeight + xAxisLabelOffset}
            >Population</text>
            <Marks data={data} xScale={xScale} yScale={yScale} xVal={xVal} yVal={yVal} />
          </g>
        </svg>
)}

export const getStaticProps = async () => {
  const data = await fetchData()
  console.log(data)
  return {
    props:{
      data
    }
  }
}