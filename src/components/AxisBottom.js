export const AxisBottom = ({xScale, innerHeight,tickFormat}) =>
{
    console.log(xScale.ticks())
    return (
        xScale.ticks().map(tickValue => (
            <g transform={`translate(${xScale(tickValue)},0)`} >
                <line
                    y2={innerHeight}
                    stroke='black'
                />
                <text style={ {textAnchor:"center"}} y={innerHeight} dy="0.45em" style={{textAnchor:"center"}} >
                    {tickFormat(tickValue)}
                </text>
            </g>
        ) )
    )
}