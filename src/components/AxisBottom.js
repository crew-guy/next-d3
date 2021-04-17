export const AxisBottom = ({
    xScale,
    innerHeight,
    xAxisTickFormat,
    yAxisTickOffset 
    }) =>
{   
    return (
        <g className='x-axis-labels' >
            {xScale.ticks().map(tickValue => (
                <g
                    className="x-label labels"
                    transform={`translate(${xScale(tickValue)},0)`}
                >
                    <line
                        y2={innerHeight}
                    />
                    <text
                        textAnchor="middle"
                        dy="-0.6em"
                    >
                        {xAxisTickFormat(tickValue)}
                    </text>
                </g>
            ))}
        </g>

  )
}