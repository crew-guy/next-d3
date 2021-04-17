export const AxisBottom =({xScale, innerHeight, xAxisTickFormat}) => {
    return (
        <g className='x-axis-labels' >
            {xScale.ticks().map(tickValue => (
                <g
                    className="x-label labels"
                    transform={`translate(${xScale(tickValue), 0})`}
                >
                    <line
                        y2={innerHeight}
                    />
                    <text
                        textAnchor="center"
                        y={innerHeight + 8}
                        dy="0.4em"
                    >
                        {xAxisTickFormat(tickValue)}
                    </text>
                </g>
            ))}
        </g>

  )
}