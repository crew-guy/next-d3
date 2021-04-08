import Head from 'next/head'
import styles from '../styles/Home.module.css'
import * as d3 from 'd3'
import {useState, useEffect} from 'react'
import {scaleLinear, scaleBand, max} from 'd3'
import {AxisTop} from '@components/AxisTop'
import {AxisBottom} from '@components/AxisBottom'
import {Marks} from '@components/Marks'
import {fetchData} from '@helpers/fetchData'

export default function Home({data}) {
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  useEffect(()=>{
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  },[])

  const margin = {top:40, left:200, right:40, bottom:40}
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const yScale = scaleBand()
      .domain(data.map(d=>d.Country))
      .range([0,innerHeight])

  const xScale = scaleLinear()
      .domain([0, max(data, d=>d.Population)])
      .range([0,innerWidth])

  return (
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left},${margin.top})`} >
            <AxisTop xScale={xScale} innerHeight={innerHeight} />
            <AxisBottom yScale={yScale}/>
            <Marks data={data} xScale={xScale} yScale={yScale}/>
          </g>
        </svg>
)

}

export const getStaticProps = async () => {
  const data = await fetchData()
  console.log(data)
  return {
    props:{
      data
    }
  }
}