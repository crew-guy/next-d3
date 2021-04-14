export const AxisLeft = ({yScale,innerWidth, tickFormat}) =>
(
    yScale.ticks().map(tickValue => (
        <g transform={`translate(0,${yScale(tickValue)})`} >
            <line
                x2={innerWidth}
                stroke="black"
            />
            <text
                x={0}
                style={ {textAnchor:"center"}}
                dx="-0.3em"
            >
                {tickFormat(tickValue)}    
            </text>
        </g>  
    ))
)