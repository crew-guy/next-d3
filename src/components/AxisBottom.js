
export default function AxisBottom(
    {
        xScale,
        innerHeight,
        tickFormat,
        xAxisTickOffset
    })
{
    return (
        <g className="x-axis-ticks">
            {xScale?.ticks().map((tickValue,i) => (
                <g
                    key={i}
                    className='ticks'
                    transform={`translate(${xScale(tickValue)},0)`}
                >
                    <line y2={innerHeight} />
                    <text
                        textAnchor='middle'
                        y={innerHeight + xAxisTickOffset}
                        dy="0.65em"
                    >
                        {tickFormat(tickValue)}
                    </text>
                </g>
                ))
            }
        </g>
    )
}
