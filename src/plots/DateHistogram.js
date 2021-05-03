// Importing the components 
import AxisLeft from '@components/AxisLeft'
import AxisBottom from '@components/AxisBottom'
import HistogramMarks from '@components/HistogramMarks'
import XAxisLabel from '@components/XAxisLabel'
import { useConfig } from '@contexts/ConfigContext'
import YAxisLabel from '@components/YAxisLabel'

export default function DateHistogram() {

  const config = useConfig()

  const {
    dateHistogramHeight,
    dateHistogramWidth,
    xScale,
    yScale,
    summedBinnedData,
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
  
  return (
    <>
      <AxisBottom
        xScale={xScale}
        innerHeight={dateHistogramHeight}
        xAxisTickOffset={xAxisTickOffset}
        tickFormat={xAxisTickFormat}
      />
      <AxisLeft
        yScale={yScale}
        innerWidth={dateHistogramWidth}
        yAxisTickOffset={yAxisTickOffset}
        tickFormat={yAxisTickFormat}
      />
      <HistogramMarks
        xScale={xScale}
        yScale={yScale}
        radiusCircle={radiusCircle}
        innerHeight={dateHistogramHeight}
        tooltipFormat={tooltipFormat}
        binnedData={summedBinnedData}
      />
      <XAxisLabel
        innerHeight={dateHistogramHeight}
        innerWidth={dateHistogramWidth}
        xAxisLabelOffset={xAxisLabelOffset}
        xAxisLabel={xAxisLabel}
      />
      <YAxisLabel
        innerHeight={dateHistogramHeight}
        yAxisLabelOffset={yAxisLabelOffset}
        yAxisLabel={yAxisLabel}
      />
    </>
  )
}