export default function HistogramMarks({
    binnedData,
    xScale,
    yScale,
    tooltipFormat,
    innerHeight
})
{
    return (
        <g className="marks" >
            {binnedData.map((dataPoint,i) => (
                <g key={i} className="mark">
                    <rect
                        x={xScale(dataPoint.x0)}
                        y={yScale(dataPoint.y)}
                        width={xScale(dataPoint.x1) - xScale(dataPoint.x0)}
                        height={innerHeight-yScale(dataPoint.y)}
                    />
                    <title>{tooltipFormat(dataPoint.y)} </title>
                </g>
                )  )}
        </g>

      )
    }