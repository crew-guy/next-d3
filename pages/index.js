import Head from 'next/head'
import {AxisBottom} from '@components/AxisBottom'
import {AxisLeft} from '@components/AxisLeft'
import {Marks} from '@components/Marks'
import { useConfig } from "@contexts/ConfigContext"
import {XAxisLabel} from "@components/XAxisLabel"
import {YAxisLabel} from '@components/YAxisLabel'
import {Dropdown} from '@components/Dropdown'

const Home = () =>
{
  const config = useConfig()
  console.log(config)

  const {
    data,
    margin,
    attributes,
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
    currentX,
    currentY
  } = config

  return (
    <>
    <Dropdown attributes={attributes} setAttribute={setXAttribute}  />
    <Dropdown attributes={attributes} setAttribute={setYAttribute}  />
    <svg
      height={height}
      width={width}
    >
      <g
        height={innerHeight}
        width={innerWidth}
        transform={
          `translate(
            ${margin.left},
            ${margin.top}
            )`
        }
      >
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
        <Marks
          xScale={xScale}
          yScale={yScale}
          xVal={xVal}
          yVal={yVal}
          data={data}
          tooltipFormat={tooltipFormat}
        />
        <XAxisLabel
          innerHeight={innerHeight}
          innerWidth={innerWidth}
          xAxisLabel={xAxisLabel}
          xAxisLabelOffset={xAxisLabelOffset}
        />
        <YAxisLabel
          innerHeight={innerHeight}
          yAxisLabel={yAxisLabel}
          yAxisLabelOffset={yAxisLabelOffset}
        />
      </g>
    </svg>
  </>
  )
}

export default Home
