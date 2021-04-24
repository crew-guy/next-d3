import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {fetchData} from '@helpers/fetchData'
import { useState, useEffect } from 'react'

// Importing the components 
import Marks from '@components/Marks'

export default function Home({countries, interiors}) {
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  
  useEffect(() =>
  {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  }, [])
  
  const margin = {
    top: 60,
    left: 140,
    right: 80,
    bottom:100
  }

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  // console.log(countries)

  return (
      <svg height={height} width={width} >
      <g className="marks" height={innerHeight} width={innerWidth} >
        <Marks
        countries={countries} interiors={interiors}
        />
      </g>
    </svg>
  )
}

export const getStaticProps = async () =>
{
  const { countries, interiors } = await fetchData()
  console.log(countries, interiors)
  return {
    props:{countries, interiors}
  }
}