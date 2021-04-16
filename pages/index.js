import Head from 'next/head'
import {AxisBottom} from '@components/AxisBottom'
import {AxisLeft} from '@components/AxisLeft'
import {Marks} from '@components/Marks'
import {useConfig} from "@contexts/ConfigContext"

const Home = () =>
{
  const config = useConfig()
  console.log(config)

  return (
    <h1>Hi !</h1>
  )
}

export default Home

{/**<svg width={width} height={height}>
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
    </svg> */}