export const AxisLeft = ({ yScale, innerWidth, innerHeight, tickFormat, tickOffset }) =>
(
    <g className="y-ticks">
        {yScale.ticks().map(tickValue => (
            <g transform={`translate(0,${innerHeight - yScale(tickValue)})`} >
                <line
                    x2={innerWidth}
                    className="ticks"
                />
                <text
                    x={-tickOffset}
                    dy="0.4em"
                    style={ {textAnchor:"end"}}
                    dx="-0.3em"
                >
                    {tickFormat(tickValue)}    
                </text>
            </g>  
        ))}
    </g>
)