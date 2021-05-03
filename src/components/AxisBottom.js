
export const AxisBottom = ({
    xScale,
    innerHeight,
    xAxisTickFormat,
    xAxisTickOffset
    }) =>
{
    return (
        <g className='x-axis-labels' >
            {xScale.ticks().map(tickValue => (
                <g
                    key={tickValue}
                    className="x-label labels"
                    transform={`translate(${xScale(tickValue)},0)`}
                >
                    <line
                        y2={innerHeight}
                    />
                    <text
                        textAnchor="middle"
                        dy="0.6em"
                        y={innerHeight + xAxisTickOffset}
                    >
                        {xAxisTickFormat(tickValue)}
                    </text>
                </g>
            ))}
        </g>

  )
}
