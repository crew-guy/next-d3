import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useConfig } from '@contexts/ConfigContext'
import BubbleMap from '@plots/BubbleMap'
import DateHistogram from '@plots/DateHistogram'

export default function Home()
{
  const config = useConfig()
  const {
    height,
    width,
    innerHeight,
    innerWidth,
    margin,
    bubbleMapHeight,
    dateHistogramHeight
  } = config

  return (
      <svg
        height={height}
        width = {width}
      >
        <g
          height={innerHeight}
          width={innerWidth}
          transform={`translate(${margin.left},${margin.top})`}
        >
        <g
          height={bubbleMapHeight}
          width={innerWidth} >
            <BubbleMap />
          </g>
          <g
            height={dateHistogramHeight}
            width={innerWidth} 
            transform={`translate(0,${bubbleMapHeight + 50})`}
          >
            <DateHistogram/>
          </g>
        </g>
      
      </svg>
  )
}
