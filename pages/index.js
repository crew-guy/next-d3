import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useConfig } from '@contexts/ConfigContext'
import BubbleMap from '@plots/BubbleMap'

export default function Home()
{
  const config = useConfig()
  const {
    height,
    width,
    innerHeight,
    innerWidth,
    margin,
  } = config

  return (
    <div className={styles.container}>
      <svg
        height={height}
        width = {width}
      >
        <g
          height={innerHeight}
          width={innerWidth}
          transform={`translate(${margin.left},${margin.top})`}
        >
          <BubbleMap/>
        </g>
      
      </svg>
    </div>
  )
}
