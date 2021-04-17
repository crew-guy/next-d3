import Head from 'next/head'
import {AxisBottom} from '@components/AxisBottom'
import {AxisLeft} from '@components/AxisLeft'
import {Marks} from '@components/Marks'
import { useConfig } from "@contexts/ConfigContext"
import {XAxisLabel} from "@components/XAxisLabel"
import {YAxisLabel} from '@components/YAxisLabel'

const Home = () =>
{
  const config = useConfig()
  console.log(config)

  const {
    data,
    margin,
    height,
    width,
    innerHeight,
    innerWidth,
    xVal,
    yVal,
    xScale,
    yScale,
    setXAttribute,
    setYAttribute,
    tooltipFormat,
    xAxisTickFormat,
    yAxisTickFormat,
    xAxisTickOffset,
    yAxisTickOffset,
    xAxisLabel,
    yAxisLabel,
    xAxisLabelOffset,
    yAxisLabelOffset,
  } = config

  return (
    <svg height = {height} width = {width} style = {{background:"#eee" }}>
      <g height={innerHeight} width={innerWidth} transform={`translate(${margin.left},${margin.top})`}  style = {{background:"#aaa" }}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          xAxisTickFormat={xAxisTickFormat}
          xAxisTickOffset={xAxisTickOffset}
        />
        <AxisLeft
          yScale={yScale}
          innerWidth={innerWidth}
          yAxisTickFormat={yAxisTickFormat}
          yAxisTickOffset={yAxisTickOffset}
        />
      </g>
    </svg>
  )
}

export default Home
