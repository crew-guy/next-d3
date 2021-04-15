export const AxisBottom = ({xScale, innerHeight,tickFormat, tickOffset}) =>
{
    // console.log(xScale.ticks())
    return (
        <g className="x-ticks">
            {xScale.ticks().map(tickValue => (
                <g transform={`translate(${xScale(tickValue)},0)`} >
                    <line
                        y2={innerHeight}
                        className='ticks'
                        />
                    <text
                        style={{ textAnchor: "center" }}
                        y={innerHeight + tickOffset}
                        dy="0.45em"
                    >
                        {tickFormat(tickValue)}
                    </text>
                </g>
            ) )}
        </g>
    )
}