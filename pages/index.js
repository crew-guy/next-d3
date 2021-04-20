import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useConfig } from '@contexts/ConfigContext'
import Marks from '@components/Marks'

export default function Home()
{
  const config = useConfig()
  // console.log(config)
  const {
    height,
    width,
    innerHeight,
    innerWidth,
    data,
    margin,
    sizeScale,
    sizeValue
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
          <Marks
            data={data}
            sizeScale={sizeScale}
            sizeValue={sizeValue}
          />
        </g>
      
      </svg>
    </div>
  )
}
