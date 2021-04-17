export const AxisLeft = ({ yScale, innerWidth, yAxisTickFormat, xAxisTickOffset }) => (
    <g className="y-axis-labels" >
        {yScale.ticks().map(tickValue => (
            <g
                className="y-label labels"
                transform={`translate(0,${yScale(tickValue)}) `} >
                <line
                    x2={innerWidth}
                />  
                <text
                    textAnchor="end"
                    xAxisTickOffset = {-xAxisTickOffset}
                >
                    {yAxisTickFormat(tickValue)}
                </text>
            </g>
        ) )  }
    </g>
)