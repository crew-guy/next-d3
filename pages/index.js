import Head from 'next/head'
import { useConfig } from "@contexts/ConfigContext"

import AxesLabels from '@components/AxesLabels'
import MarksAndAxes from '@components/MarksAndAxes'
import ControlPanel from '@components/ControlPanel'
import Legend from '@components/Legend'

const Home = () =>
{
  const config = useConfig()

  const {
    height,
    width,
  } = config

  return (
    <>
      <ControlPanel/>
    <svg
      height={height}
      width={width}
    >
      <Legend/>  
      <MarksAndAxes/>
      <AxesLabels/>        
    </svg>
  </>
  )
}

export default Home
