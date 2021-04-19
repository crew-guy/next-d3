export const AxisLeft = ({
    yScale,
    innerWidth,
    yAxisTickFormat,
    yAxisTickOffset
    }) => (
    <g className="y-axis-labels" >
        {yScale.ticks().map(tickValue => (
            <g
                className="y-label labels"
                key={tickValue}
                transform={`translate(0,${yScale(tickValue)}) `} >
                <line
                    x2={innerWidth}
                />  
                <text
                    textAnchor="end"
                    x={-yAxisTickOffset}
                >
                    {yAxisTickFormat(tickValue)}
                </text>
            </g>
        ))} 
    </g>
)