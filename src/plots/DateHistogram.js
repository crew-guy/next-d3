import {bin, scaleLinear, max, timeMonths, sum} from 'd3'

// Importing the components 
import AxisLeft from '@components/AxisLeft'
import AxisBottom from '@components/AxisBottom'
import HistogramMarks from '@components/HistogramMarks'
import XAxisLabel from '@components/XAxisLabel'
import { useConfig } from '@contexts/ConfigContext'
import YAxisLabel from '@components/YAxisLabel'

// export default function Home({data}) {
export default function DateHistogram() {

  const config = useConfig

  const {
    xVal,
    yVal,
    xScale,
    summedBinnedData,
    yScale,
    xAxisLabel,
    yAxisLabel,
    xAxisLabelOffset,
    yAxisLabelOffset,
    xAxisTickOffset,
    yAxisTickOffset,
    xAxisTickFormat,
    yAxisTickFormat,
    tooltipFormat,
    radiusCircle
  } = config

//   console.log(binnedData)
  
  return (
      <svg height={height} width={width} >
      <g
        height={innerHeight}
        width={innerWidth}
        transform={`translate(${margin.left},${margin.top})`}
      >
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          xAxisTickOffset={xAxisTickOffset}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft
          yScale={yScale}
          yAxisTickOffset={yAxisTickOffset}
          innerWidth={innerWidth}
          tickFormat={yAxisTickFormat}
        />
        <HistogramMarks
          binnedData={summedBinnedData}
          xScale={xScale}
          yScale={yScale}
          radiusCircle={radiusCircle}
          innerHeight={innerHeight}
          tooltipFormat={tooltipFormat}
        />
        <XAxisLabel
          innerHeight={innerHeight}
          innerWidth={innerWidth}
          xAxisLabelOffset={xAxisLabelOffset}
          xAxisLabel={xAxisLabel}
        />
        <YAxisLabel
          innerHeight={innerHeight}
          yAxisLabelOffset={yAxisLabelOffset}
          yAxisLabel={yAxisLabel}
        />
      </g>
    </svg>
  )
}